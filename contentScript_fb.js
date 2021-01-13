document.querySelectorAll("a[aria-label='Advertiser link']").forEach((e) => {
  if (e && e.offsetParent) {
    e.offsetParent.hidden = true;
  }
});
function hideFeed(e) {
  var feed = e.closest("div[data-pagelet]");
  if (feed) feed.hidden = true;
}
function skipAd() {
  try {
    document.querySelectorAll("a[href^='#']").forEach((e) => {
      if (e && e.text && !/\d/.test(e.text)) {
        hideFeed(e);
      }
    });
    document.querySelectorAll("div[role='button']").forEach((e) => {
      if (e && e.innerText && e.innerText.startsWith("Sponsored")) {
        hideFeed(e);
      }
    });
    var ads = document.querySelectorAll("a[aria-label='Advertiser link']");
    if (
      ads &&
      ads.length > 0 &&
      ads[0] &&
      ads[0].offsetParent &&
      ads[0].offsetParent.offsetParent
    ) {
      ads[0].offsetParent.offsetParent.hidden = true;
    }
  } catch (e) {}
}
setInterval(() => {
    skipAd();
}, 5000);
