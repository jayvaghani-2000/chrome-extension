import {
  SNAPCHAT_STORAGE_KEY,
  SNAPCHAT_SERVICE_MESSAGES,
} from "@/src/lib/constant/snapchat";
import { FilterStream } from "./filter-stream";

// Ideally we'd use an editor or import shaders directly from the API.
// import { distortedTV as shader } from './distorted-tv';
//import { moneyFilter as shader } from './money-filter.js';

function monkeyPatchMediaDevices() {
  var spoofImageBlob = null;
  let activeFilter: FilterStream | null = null;
  window.addEventListener("message", (event) => {
    if (
      event.source === window &&
      event.data.action === SNAPCHAT_SERVICE_MESSAGES.SEND_SNAP_BLOB
    ) {
      spoofImageBlob = event.data.data.blob;
    }
  });

  const enumerateDevicesFn = MediaDevices.prototype.enumerateDevices;
  const getUserMediaFn = MediaDevices.prototype.getUserMedia;

  MediaDevices.prototype.getUserMedia = async function () {
    const args = arguments;
    if (args.length && args[0].video && args[0].video.deviceId) {
      const constraints = {
        video: {
          facingMode: args[0].facingMode,
          advanced: args[0].video.advanced,
          width: args[0].video.width,
          height: args[0].video.height,
        },
        audio: false,
      };
      const res = await getUserMediaFn.call(
        navigator.mediaDevices,
        constraints
      );
      if (res && spoofImageBlob) {
        const filter = new FilterStream(res, spoofImageBlob);
        activeFilter = filter;
        await filter.waitForImageLoad();
        const outputStream = filter.outputStream;
        outputStream.addEventListener("ended", async () => {
          await new Promise<void>((resolve) => {
            let timeElapsed = 0;
            const checkSpoofedStream = () => {
              const isSnapLoaded = localStorage.getItem(
                SNAPCHAT_STORAGE_KEY.IS_LIVE_SNAP_LOADED
              );
              if (!isSnapLoaded || timeElapsed > 5000) {
                filter.stop();
                resetVideoFeed();
                resolve();
              } else {
                timeElapsed += 300;
                setTimeout(checkSpoofedStream, 300);
              }
            };
            checkSpoofedStream();
          });
        });
        return outputStream;
      }
      // }
    }
    const res = await getUserMediaFn.call(navigator.mediaDevices, ...arguments);
    spoofImageBlob = null;
    return res;
  };

  function resetVideoFeed() {
    if (activeFilter) {
      activeFilter.stop(); // Stop the current filter
      activeFilter = null; // Clear the filter reference
      console.log("Video feed spoofing has been reset.");
    }
  }

  console.log("HOTBOT WEBCAM INSTALLED.");
}

export { monkeyPatchMediaDevices };
