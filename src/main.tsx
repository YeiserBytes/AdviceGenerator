import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.scss";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(<App />);
