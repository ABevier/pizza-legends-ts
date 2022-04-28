import Sprite from "./Sprite";

export interface State {
  arrow?: Direction;
}

export type Direction = "up" | "down" | "left" | "right";

export interface GameObjectConfig {
  x?: number;
  y?: number;
  direction?: Direction;
  src?: string;
}

class GameObject {
  x: number;
  y: number;
  direction: Direction;
  sprite: Sprite;

  constructor(config: GameObjectConfig) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "images/characters/people/hero.png",
    });
  }

  update(state: State) {}
}

export default GameObject;
