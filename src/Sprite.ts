import GameObject from "./GameObject";
import utils from "./utils";

type SpriteAnimation = number[][];

interface SpriteConfig {
  src: string;
  currentAnimation?: string;
  animations?: Record<string, SpriteAnimation>;
  animationFrameLimit?: number;
  gameObject: GameObject;
}

class Sprite {
  image: HTMLImageElement;
  shadow: HTMLImageElement;

  animations: Record<string, SpriteAnimation>;

  currentAnimation: string;
  currentAnimationFrame: number;

  animationFrameLimit: number;
  animationFrameProgress: number;

  gameObject: GameObject;

  useShadow: boolean;
  isLoaded: boolean = false;
  isShadowLoaded: boolean = false;

  constructor(config: SpriteConfig) {
    //Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    //Shadow
    this.useShadow = true; // config.useShadow || false
    this.shadow = new Image();
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    //Configure Animation and Intial State
    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };

    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = 0;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key: string) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress--;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame++;
    // reset if we increment too high, could also use %
    if (!this.frame) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    const xNudge = 8;
    const yNudge = 18;
    // calculate the nudge on x and y and then adjust for game object the camera is centered on
    const x = this.gameObject.x - xNudge + (utils.withGrid(10.5) - cameraPerson.x);
    const y = this.gameObject.y - yNudge + (utils.withGrid(6) - cameraPerson.y);

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

    this.isLoaded &&
      ctx.drawImage(
        this.image,
        frameX * 32, // left cut
        frameY * 32, // top cut
        32, // width of cut
        32, // height of cut
        x, // x position with "nudge"
        y, // y positiong with "nudge"
        32, // sizeX
        32 // sizeY
      );

    this.updateAnimationProgress();
  }
}

export default Sprite;
