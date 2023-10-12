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

  await browser.tabs.remove(duplicateTabIds);
}

async function orderTabsByDomain() {
  const domains = {};

  const tabs = await browser.tabs.query({ currentWindow: true });

  tabs
    .filter((tab) => !tab.pinned)
    .forEach((tab) => {
      const url = new URL(tab.url);
      const domain = url.hostname;

      if (domains.hasOwnProperty(domain)) {
        domains[domain].push(tab);
      } else {
        domains[domain] = [tab];
      }
    });

  const newTabPositionIds = [];

  for (const urls of Object.values(domains)) {
    urls.forEach((tab) => {
      newTabPositionIds.push(tab.id);
    });
  }

  const totalPinnedTabs = tabs.filter((tab) => tab.pinned).length;

  await browser.tabs.move(newTabPositionIds, {
    index: totalPinnedTabs,
  });
}

async function handleToolbarButtonClick() {
  try {
    await removeDuplicateTabs();

    await orderTabsByDomain();
  } catch (e) {
    console.error(`Error: ${error}`);
  }
}

browser.browserAction.onClicked.addListener(handleToolbarButtonClick);
