chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "SIGN_OUT") {
    chrome.cookies.getAll({ url: "https://one.kpu.ca" }, (cookies) => {
      cookies.forEach((cookie) =>
        chrome.cookies.remove({ url: "https://one.kpu.ca", name: cookie.name }),
      );
      sendResponse();
    });
  }
});
