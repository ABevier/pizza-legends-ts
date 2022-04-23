import Overworld from "./Overworld";
import "./styles.css";

const init = () => {
  const overworld = new Overworld({
    element: document.querySelector(".game-container") as Element,
  });
  overworld.init();
};
init();
