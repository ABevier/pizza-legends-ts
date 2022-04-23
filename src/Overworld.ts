interface OverworldConfig {
  element: Element;
}

class Overworld {
  element: Element;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(config: OverworldConfig) {
    //TODO: handle null checks better
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  init() {
    console.log("hello from the overworld", this);
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "images/maps/DemoLower.png";

    const shadow = new Image();
    shadow.onload = () => {
      this.ctx.drawImage(
        shadow,
        0, // left cut
        0, // top cut
        32, // width of cut
        32, // height of cut
        x * 16 - 8,
        y * 16 - 18,
        32, // sizeX
        32 // sizeY
      );
    };
    shadow.src = "/images/characters/shadow.png";

    const hero = new Image();
    const x = 5;
    const y = 6;

    hero.onload = () => {
      this.ctx.drawImage(
        hero,
        0, // left cut
        0, // top cut
        32, // width of cut
        32, // height of cut
        x * 16 - 8,
        y * 16 - 18,
        32, // sizeX
        32 // sizeY
      );
    };
    hero.src = "/images/characters/people/hero.png";
  }
}

export default Overworld;
