import GameObject, { Direction, GameObjectConfig, State } from "./GameObject";

const DirectionUpdate: Record<Direction, ["x" | "y", number]> = {
  up: ["y", -1],
  down: ["y", 1],
  left: ["x", -1],
  right: ["x", 1],
};

interface PersonConfig extends GameObjectConfig {
  isPlayerControlled?: boolean;
}

class Person extends GameObject {
  movingProgessRemaining: number;
  directionUpdate: Record<Direction, ["x" | "y", number]>;
  isPlayerControlled: boolean;

  constructor(config: PersonConfig) {
    super(config);
    this.movingProgessRemaining = 0;
    this.directionUpdate = DirectionUpdate;
    this.isPlayerControlled = config.isPlayerControlled || false;
  }

  update(state: State) {
    this.updatePosition();

    if (this.isPlayerControlled && this.movingProgessRemaining === 0 && state.arrow) {
      this.direction = state.arrow;
      this.movingProgessRemaining = 16;
    }
  }

  updatePosition() {
    if (this.movingProgessRemaining) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgessRemaining -= 1;
    }
  }
}

export default Person;
