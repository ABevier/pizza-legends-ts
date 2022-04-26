import GameObject from "./GameObject";
import OverworldMap from "./OverworldMap";

interface OverworldConfig {
  element: Element;
}

class Overworld {
  element: Element;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  map!: OverworldMap;

  constructor(config: OverworldConfig) {
    //TODO: handle null checks better
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.Kitchen);
    this.startGameLoop();
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.map.drawLowerImage(this.ctx);

      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx);
      });

      this.map.drawUpperImage(this.ctx);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }
}

export default Overworld;
