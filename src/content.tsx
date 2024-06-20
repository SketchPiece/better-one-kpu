import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./global.css";

const injectedBody = `
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
`;

document
  .querySelectorAll('link[rel="stylesheet"]')
  .forEach((link) => link.remove());

document.body.innerHTML = injectedBody;
const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
