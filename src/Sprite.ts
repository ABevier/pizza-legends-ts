import GameObject from "./GameObject";

type SpriteAnimation = number[][];

interface SpriteConfig {
  src: string;
  currentAnimation?: string;
  animations?: Record<string, SpriteAnimation>;
  gameObject: GameObject;
}

class Sprite {
  image: HTMLImageElement;
  shadow: HTMLImageElement;
  currentAnimation: string;
  currentAnimationFrame: number;
  animations: Record<string, SpriteAnimation>;
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
      idleDown: [[0, 0]],
    };

    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // calculate the nudge on x and y
    const x = this.gameObject.x * 16 - 8;
    const y = this.gameObject.y * 16 - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    this.isLoaded &&
      ctx.drawImage(
        this.image,
        0, // left cut
        0, // top cut
        32, // width of cut
        32, // height of cut
        x, // x position with "nudge"
        y, // y positiong with "nudge"
        32, // sizeX
        32 // sizeY
      );
  }
}

export default Sprite;
