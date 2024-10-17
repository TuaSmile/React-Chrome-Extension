import browser, { storage } from "webextension-polyfill";

import { getOrCreateClientId, getOrCreateSessionId } from "../analytics/helper";
import { BASE_URL, fetchDataByWeb } from "../api";
import { installEvent } from "../api/analytics";
import { trackIconClick, trackIconPreview, trackTimeInProduct } from "../api/ga-event";

let startTimeIcon: number | null = null;

const openPopup = async (tabId: number, url?: string) => {
  if (startTimeIcon !== null) {
    const endTime = Date.now();  
    const elapsedTimeInSeconds = (endTime - startTime) / 1000;
    trackIconPreview(elapsedTimeInSeconds); 
    startTimeIcon = null;  
  }
  browser.tabs.sendMessage(tabId, { action: "open-popup", tabId, url });
};

const showPopupIcon = async (tabId: number, url?: string) => {
  startTimeIcon = Date.now();
  browser.tabs.sendMessage(tabId, { action: "show-popup-icon", tabId, url });
};

const updateBadgeCount = async (tabId: number) => {
  const storedData = await storage.local.get(tabId.toString());
  const data = storedData[tabId];
  if (data && Array.isArray(data)) {
    const count = data.length;
    browser.action.setBadgeText({
      tabId,
      text: count.toString(),
    });
  } else {
    browser.action.setBadgeText({
      tabId,
      text: "",
    });
  }
};

const handleData = async (tabId: number, url: string) => {
  if (!url || !url.startsWith("http")) return;

  try {
    const data = await fetchDataByWeb(url);
    if (data && Array.isArray(data) && data.length) {
      await storage.local.set({ [tabId]: data });
      updateBadgeCount(tabId); // Update badge count after setting data
      checkAndHandleTab(tabId, url);
    } else {
      await storage.local.set({ [tabId]: null });
      updateBadgeCount(tabId);
      // Do not clear storage or badge on data fetch failure to maintain state across reloads
      console.log("No data fetched or data structure unexpected");
    }
  } catch (error) {
    await storage.local.set({ [tabId]: null });
    updateBadgeCount(tabId);
    console.error("Error processing data:", error);
    // Log error but do not clear badge or storage here to maintain state
  }
};

// async function checkAndHandleTab(tabId: number, url: string) {
//   const storedData = await storage.local.get([
//     `${tabId}_url`,
//     `${tabId}_timestamp`,
//   ]);
//   const currentTime = Date.now();
//   const timeDiff = currentTime - (storedData[`${tabId}_timestamp`] || 0);

//   const domain1 = extractDomain(url);
//   const domain2 = extractDomain(storedData[`${tabId}_url`]);

//   // Check if URL has changed or if 15 minutes have passed
//   if (domain1 !== domain2 || timeDiff > 900000) {
//     // 15 minutes in milliseconds
//     await storage.local.set({
//       [`${tabId}_url`]: url,
//       [`${tabId}_timestamp`]: currentTime,
//     });
//     openPopup(tabId, url);
//   }
// }

const checkAndHandleTab = async (tabId: number, url: string) => {
  if (url.split("/").length > 1) {
    if (
      url.includes("cart") ||
      url.includes("checkout") ||
      url.includes("basket")
    ) {
      openPopup(tabId, url);
    } else {
      showPopupIcon(tabId);
    }
  } else {
    openPopup(tabId, url);
  }
};

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log("Updated URL:", tab.url);
  if (changeInfo.status === 'complete' && tab.url) {
    // When a tab is reloaded and completed loading, update the badge count based on stored data.
    handleData(tabId, tab.url);
  }
})

browser.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked!");
  tab.id && openPopup(tab.id, tab.url);
});

browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    await installEvent();

    const clientId = await getOrCreateClientId();
    const sessionId = await getOrCreateSessionId();
    browser.runtime
      .setUninstallURL(
        `${BASE_URL}/uninstall-event?clientId=${clientId}&sessionId=${sessionId}`,
      )
      .then(
        () => {},
        (err) => {
          console.log("Error while setting uninstall url with:", err);
        },
      );
  } else if (details.reason === "update") {
  }
});

// Handle incoming messages
browser.runtime.onMessage.addListener(async (message, sender) => {
  if (message.action === 'open-popup') {
    // Handle the open-popup action
    console.log('Received open-popup action');

    trackIconClick()
    if (sender.tab?.id) {
      openPopup(sender.tab.id, sender.tab.url);
    }
  } else if (message.action === 'show-popup-icon') {
    // Handle the show-popup-icon action1
    console.log('Received show-popup-icon action');
    if (sender.tab?.id) {
      const badgeText = await browser.action.getBadgeText({tabId: sender.tab?.id});
      badgeText && showPopupIcon(sender.tab.id, sender.tab.url);
    }
  }
});

// Track time in product (example: using setInterval to track time spent)
const startTime = Date.now();
setInterval(() => {
  const seconds: number = Math.floor((Date.now() - startTime) / 1000);
  trackTimeInProduct(seconds);
}, 1000); // Send event every 60 seconds