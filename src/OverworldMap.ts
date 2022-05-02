import GameObject from "./GameObject";
import Person from "./Person";
import utils from "./utils";

export interface OverworldMapConfig {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: Record<string, GameObject>;
}

class OverworldMap {
  gameObjects: Record<string, GameObject>;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;

  constructor(config: OverworldMapConfig) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    const x = utils.withGrid(10.5) - cameraPerson.x;
    const y = utils.withGrid(6) - cameraPerson.y;
    ctx.drawImage(this.lowerImage, x, y);
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    const x = utils.withGrid(10.5) - cameraPerson.x;
    const y = utils.withGrid(6) - cameraPerson.y;
    ctx.drawImage(this.upperImage, x, y);
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npc1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "/images/characters/people/npc1.png",
      }),
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new GameObject({
        x: 3,
        y: 5,
      }),
      npcA: new GameObject({
        x: 9,
        y: 6,
        src: "/images/characters/people/npc2.png",
      }),
      npcB: new GameObject({
        x: 10,
        y: 8,
        src: "/images/characters/people/npc3.png",
      }),
    },
  },
};

export default OverworldMap;
