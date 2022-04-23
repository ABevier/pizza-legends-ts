import "./styles.css";
import { getGreeting } from "./greeting";

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet(): string {
    return getGreeting();
  }
}
