console.log("content script loaded");
console.log(document.location.href);

const injectedHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <title>One KPU</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

document.write(injectedHTML);

const commonOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

async function start() {
  const rawCollectionData = await fetch(`/tasks`, {
    method: "POST",
    body: JSON.stringify({
      pageNumber: 0,
      mobile: false,
      mobileOnly: false,
      taskCollectionUniqueKey: "_popular_",
      secondaryKey: null,
    }),
    ...commonOptions,
  }).then((res) => res.json());
  console.log(rawCollectionData);
}

start();
