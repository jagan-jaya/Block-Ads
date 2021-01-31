let skippedAds = 0;
function hideFeed(e) {
  var feed = e.offsetParent.offsetParent.offsetParent;
  if (feed) {
    skippedAds++;
    feed.parentNode.removeChild(feed);
  }
}
function skipAd() {
  try {
    document.querySelectorAll("a[href^='#']").forEach((e) => {
      if (e && e.text && !/\d/.test(e.text)) {
        hideFeed(e);
      }
    });
    document.querySelectorAll("a[href^='/ads']").forEach((e) => {
      if (e && e.text && !/\d/.test(e.text)) {
        hideFeed(e);
      }
    });
    document.querySelectorAll("div[role='button']").forEach((e) => {
      if (e && e.innerText && e.innerText.startsWith("Sponsored")) {
        hideFeed(e);
      }
    });
    document
      .querySelectorAll("a[aria-label='Advertiser link']")
      .forEach((e) => {
        if (e && e.offsetParent) {
          skippedAds++;
          e.offsetParent.parentNode.removeChild(e.offsetParent);
        }
      });
  } catch (e) {}
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  skipAd();
  sendResponse({host:location.hostname, skipped:skippedAds});
  skippedAds =0;
});
