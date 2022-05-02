import DirectionInput from "./DirectionInput";
import OverworldMap from "./OverworldMap";

interface OverworldConfig {
  element: Element;
}

class Overworld {
  element: Element;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  directionInput!: DirectionInput;
  map!: OverworldMap;

  constructor(config: OverworldConfig) {
    //TODO: handle null checks better
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Establish camera
      const cameraPerson = this.map.gameObjects.hero;

      // update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
        });
      });

      // Draw map and all objects
      this.map.drawLowerImage(this.ctx, cameraPerson);

      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }
}

export default Overworld;
