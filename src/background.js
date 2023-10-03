async function removeDuplicateTabs() {
  const tabs = await browser.tabs.query({});

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

async function groupTabsByDomain() {
  const tabs = await browser.tabs.query({});

  const domainGroups = {};

  tabs
    .filter((tab) => !tab.pinned)
    .forEach((tab) => {
      const url = new URL(tab.url);
      const domainKey = url.hostname;

      if (domainGroups.hasOwnProperty(domainKey)) {
        domainGroups[domainKey].push(tab);
      } else {
        domainGroups[domainKey] = [tab];
      }
    });

  const newTabPositionIds = [];

  for (const urls of Object.values(domainGroups)) {
    urls.forEach((url) => {
      newTabPositionIds.push(url.id);
    });
  }

  await browser.tabs.move(newTabPositionIds, {
    index: 0,
  });
}

async function handleToolbarButtonClick() {
  try {
    await removeDuplicateTabs();

    await groupTabsByDomain();
  } catch (e) {
    console.error(`Error: ${error}`);
  }
}

browser.browserAction.onClicked.addListener(handleToolbarButtonClick);
