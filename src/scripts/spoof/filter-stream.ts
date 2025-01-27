import { SNAPCHAT_STORAGE_KEY } from '@/src/lib/constant/snapchat';
class FilterStream {
  public stream: MediaStream;
  public video: HTMLVideoElement;
  public canvas: HTMLCanvasElement;
  public outputStream: MediaStream;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement | null = null;
  private imageLoaded: boolean = false;

  constructor(stream: MediaStream, imageBlob: Blob) {
    console.log('New Filter for stream', stream);
    this.stream = stream;
    this.video = document.createElement('video');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.outputStream = this.canvas.captureStream();

    this.video.srcObject = stream;
    this.video.autoplay = true;

    this.loadImage(imageBlob)
      .then((img) => {
        this.image = img;
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.imageLoaded = true;
        this.video.addEventListener('playing', () => this.update());
      })
      .catch((err) => console.error('Failed to load image:', err));
  }

  private async loadImage(imageBlob: Blob): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const objectURL = URL.createObjectURL(imageBlob);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(objectURL);
        resolve(img);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(objectURL);
        reject(err);
      };
      img.src = objectURL;
    });
  }

  private update() {
    if (this.imageLoaded) {
      // Set canvas dimensions to 9:16 aspect ratio
      const maxHeight = this.canvas.height;
      const newWidth = (maxHeight * 9) / 16;
      this.canvas.width = newWidth;
      this.canvas.height = maxHeight;

      this.ctx.save();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Calculate scale and position for object-fit: cover
      const imgAspectRatio = this.image!.width / this.image!.height;
      const canvasAspectRatio = this.canvas.width / this.canvas.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspectRatio > canvasAspectRatio) {
        drawHeight = this.canvas.height;
        drawWidth = drawHeight * imgAspectRatio;
        offsetX = (this.canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = this.canvas.width;
        drawHeight = drawWidth / imgAspectRatio;
        offsetX = 0;
        offsetY = (this.canvas.height - drawHeight) / 2;
      }

      this.ctx.translate(this.canvas.width, 0);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(this.image!, offsetX, offsetY, drawWidth, drawHeight);
      this.ctx.restore();
    }
    requestAnimationFrame(() => this.update());
  }

  public stop() {
    if (this.outputStream) {
      this.outputStream.getTracks().forEach((track) => {
        track.stop();
        this.outputStream.removeTrack(track);
      });
    }
  }

  public isImageLoaded(): boolean {
    return this.imageLoaded;
  }

  public waitForImageLoad(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkImageLoad = () => {
        if (this.imageLoaded) {
          localStorage.setItem(
            SNAPCHAT_STORAGE_KEY.IS_LIVE_SNAP_LOADED,
            'true',
          );
          resolve();
        } else {
          setTimeout(checkImageLoad, 300);
        }
      };
      checkImageLoad();
    });
  }
}

export { FilterStream };
