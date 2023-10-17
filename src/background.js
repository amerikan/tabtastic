async function removeDuplicateTabs() {
  const duplicateTabIds = [];
  const urls = {};

  const tabs = await browser.tabs.query({ currentWindow: true });

  tabs.forEach((tab) => {
    if (urls.hasOwnProperty(tab.url)) {
      duplicateTabIds.push(tab.id);
    } else {
      urls[tab.url] = true;
    }
  });

  if (duplicateTabIds.length) {
    await browser.tabs.remove(duplicateTabIds);
  }
}

async function orderTabsByDomain() {
  let tabsToMove = [];
  const domains = {};

  const tabs = await browser.tabs.query({ currentWindow: true });

  tabs
    .filter((tab) => !tab.pinned)
    .forEach((tab) => {
      const url = new URL(tab.url);
      const apexDomain = url.hostname.split(".").slice(-2).join(".");

      if (domains.hasOwnProperty(apexDomain)) {
        domains[apexDomain].push(tab);
      } else {
        domains[apexDomain] = [tab];
      }
    });

  for (const domainURLs of Object.values(domains)) {
    const sortedTabURLs = domainURLs
      .slice()
      .sort((a, b) => a.url.localeCompare(b.url));

    tabsToMove = [...tabsToMove, ...sortedTabURLs];
  }

  if (tabsToMove.length) {
    const totalPinnedTabs = tabs.filter((tab) => tab.pinned).length;

    // Check if tabs.move api method is supported
    if (typeof browser.tabs.move === "function") {
      const tabsToMoveIds = tabsToMove.map((tab) => tab.id);

      await browser.tabs.move(tabsToMoveIds, {
        index: totalPinnedTabs,
      });
    } else {
      // Simulate "move" api using remove/create apis
      tabsToMove.forEach(async (tab, index) => {
        const newIndexPosition = totalPinnedTabs + index;

        // Ignore if already in correct position
        if (tab.index !== newIndexPosition) {
          await browser.tabs.remove(tab.id);

          await browser.tabs.create({
            url: tab.url,
            index: newIndexPosition,
          });
        }
      });
    }
  }
}

async function handleToolbarButtonClick() {
  try {
    await removeDuplicateTabs();

    await orderTabsByDomain();
  } catch (e) {
    console.error(`Error: ${e}`);
  }
}

browser.browserAction.onClicked.addListener(handleToolbarButtonClick);
