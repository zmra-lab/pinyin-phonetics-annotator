chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'zmra-pinyin-annotate',
    title: 'ZMRA: 添加拼音四声色彩标注',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'zmra-pinyin-annotate' && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      action: 'ANNOTATE_SELECTION',
      text: info.selectionText
    });
  }
});
