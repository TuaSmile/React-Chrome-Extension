import browser from "webextension-polyfill";

let root: HTMLIFrameElement | null = null;

// Listen for messages from the background script
browser.runtime.onMessage.addListener(async (message) => {
  if (message.action === "show-popup-icon") {
    document.getElementById("cc-extension-iframe")?.remove();

    if (root) {
      root.remove();
    }

    root = document.createElement("iframe");
    root.style.top = "10rem";
    root.style.right = "-11px";
    root.style.width = "100px";
    root.style.height = "100px";
    root.style.position = "fixed"; // Position it as needed
    root.style.zIndex = "9999999999"; // Ensure it's above other elements
    root.style.colorScheme = "auto"
    root.setAttribute("id", "cc-extension-iframe-popup-icon");

    root.setAttribute("frameBorder", "0");
    root.src = browser.runtime.getURL("pop-icon.html");

    document.documentElement.appendChild(root);
  }

  if (message.action === "open-popup") {
    const element = document.getElementById("cc-extension-iframe");
    if (element) {
      element.remove();
      if (root) {
        root.remove();
        root = null; // Clear root reference
      }
    } else {
      if (root) {
        root.remove();
        root = null; // Clear root reference
      }

      root = document.createElement("iframe");
      root.style.width = "100vw";
      root.style.height = "100vh";
      root.style.paddingTop = "10px";
      root.style.top = "0px";
      root.style.right = '0px';
      root.style.position = "fixed"; // Position it as needed
      root.style.zIndex = "2147483649"; // Ensure it's above other elements
      root.style.colorScheme = "auto"
      root.style.display = "flex";
      root.style.justifyContent = "end";
      root.setAttribute("id", "cc-extension-iframe");

      root.style.width = "470px"; // Set the desired width
      root.style.height = "630px";
      root.style.borderRadius = "6px";
      root.style.marginRight = "60px";
      root.setAttribute("frameBorder", "0");
      root.src = browser.runtime.getURL("index.html");

      document.documentElement.appendChild(root);

      // Optional: add a click handler to close the iframe when clicking outside of it
      root.addEventListener('click', (event) => {
        if (event.target === root) {
          root?.remove();
          root = null;
        }
      });
    }
  }

  if (message.action === "close-iframe" && root) {
    // Hide or remove the iframe
    root.remove(); // To remove completely
    document.getElementById("cc-extension-iframe")?.remove();
    root = null; // Clear root reference

    // Reopen the popup icon
    browser.runtime.sendMessage({ action: "show-popup-icon" });
  }
});
