import { Direction } from "./GameObject";

class DirectionInput {
  heldDirections: Direction[] = [];
  //TODO: define Record where key may not exist?
  map: Record<string, Direction>;

  constructor() {
    this.map = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
    };
  }

  init() {
    document.addEventListener("keydown", (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
        console.log(this.heldDirections);
      }
    });

    document.addEventListener("keyup", (e) => {
      const dir = this.map[e.code];
      const idx = this.heldDirections.indexOf(dir);
      if (idx > -1) {
        this.heldDirections.splice(idx, 1);
        console.log(this.heldDirections);
      }
    });
  }

  get direction(): Direction | undefined {
    return this.heldDirections[0];
  }
}

export default DirectionInput;
