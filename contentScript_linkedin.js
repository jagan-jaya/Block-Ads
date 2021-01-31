let skippedAds = 0;
function hideParent(e){
  e.parentNode.removeChild(e);
  skippedAds++;
}
function skipAd() {
  Array.from(document.querySelectorAll('span.feed-shared-actor__sub-description')).filter(el => el.innerText === 'Promoted').forEach(e => {hideParent(e.closest("div[data-id^=urn]")); });
  document.querySelectorAll("section.ad-banner-container").forEach(e => { hideParent(e);});
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  skipAd();
  sendResponse({host:location.hostname, skipped:skippedAds});
  skippedAds =0;
});