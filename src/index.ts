import Overworld from "./Overworld";
import { OverworldMapConfig } from "./OverworldMap";
import "./styles.css";

declare global {
  interface Window {
    OverworldMaps: Record<string, OverworldMapConfig>;
  }
}

const init = () => {
  const overworld = new Overworld({
    element: document.querySelector(".game-container") as Element,
  });
  overworld.init();
};
init();
