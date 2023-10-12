async function removeDuplicateTabs() {
  const tabs = await browser.tabs.query({ currentWindow: true });

  const duplicateIds = [];
  const bins = {};

  tabs.forEach((tab) => {
    if (bins.hasOwnProperty(tab.url)) {
      duplicateIds.push(tab.id);
    } else {
      bins[tab.url] = true;
    }
  });

  await browser.tabs.remove(duplicateIds);
}

async function orderTabsByDomain() {
  const tabs = await browser.tabs.query({ currentWindow: true });

  const domains = {};

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

  await browser.tabs.move(newTabPositionIds, {
    index: 0,
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
