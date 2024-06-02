import ReactDOM from "react-dom/client";
import { worker } from "./mocks/browser.ts";
import { Step6 } from "./components/Step6.tsx";

worker.start().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(<Step6 />);
});
