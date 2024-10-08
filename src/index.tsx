import { AppUiProvider } from "@canva/app-ui-kit";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import {fs} from "fs";
import "@canva/app-ui-kit/styles.css";


const root = createRoot(document.getElementById("root")!);
function render() {
  root.render(
    <AppUiProvider>
      <App />
    </AppUiProvider>
  );
}

render();

if (module.hot) {
  //  module.hot.accept("./server", render);
  module.hot.accept("./app", render);
}
