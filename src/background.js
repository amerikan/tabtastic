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

async function handleToolbarButtonClick() {
  try {
    await removeDuplicateTabs();
  } catch (e) {
    console.error(`Error: ${error}`);
  }
}

browser.browserAction.onClicked.addListener(handleToolbarButtonClick);
