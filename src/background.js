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
  const newTabPositionIds = [];
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
    const sortedURLs = domainURLs
      .slice()
      .sort((a, b) => a.url.localeCompare(b.url));

    sortedURLs.forEach((tab) => {
      newTabPositionIds.push(tab.id);
    });
  }

  if (newTabPositionIds.length) {
    const totalPinnedTabs = tabs.filter((tab) => tab.pinned).length;

    await browser.tabs.move(newTabPositionIds, {
      index: totalPinnedTabs,
    });
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
