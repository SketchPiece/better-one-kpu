import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./global.css";

// const injectedHTML = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <link rel="icon" type="image/svg+xml" href="/vite.svg" />
// <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// <link rel="preconnect" href="https://fonts.googleapis.com" />
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
// <link
// href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
// rel="stylesheet"
// />
// <title>One KPU</title>
// </head>
// <body>
// <div id="root"></div>
// <script type="module" src="/src/main.tsx"></script>
// </body>
// </html>
// `;

const injectedBody = `
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
`;

// document.write(injectedHTML);

// console.log("injectedHTML", document.documentElement.innerHTML);
// console.log("root", root);
// const shadow = root.attachShadow({ mode: "open" });

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
