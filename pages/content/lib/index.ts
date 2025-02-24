console.log('content script loaded');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  sendResponse(canonical);
  return true;
});
