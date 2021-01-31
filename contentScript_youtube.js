var skipped =0;
var urls = [
  "*://www.youtube.com/get_video_info*el=adunit*",
  "*://www.youtube.com/get_midroll_info*",
]
for(var i in urls) {
  urls[i] = '^'+urls[i].replace(/\//g, '\\/').replace(/\*/g,".*")+'$';
}
function skipAd(){
  try {
    var skipbutton = document.getElementsByClassName("ytp-ad-skip-button");
    var bannerBtn = document.querySelector(".ytp-ad-overlay-close-button");
    var dismissBtn = document.querySelector(
      "ytd-button-renderer#dismiss-button"
    );
    var playerAds = document.querySelector("#player-ads");
    if (bannerBtn) {
      bannerBtn.click();
    }
    if (dismissBtn) {
      dismissBtn.click();
    }
    if (playerAds) {
      skipped++;
      playerAds.parentNode.removeChild(playerAds);
    }
    if (skipbutton && skipbutton.length > 0) {
      skipbutton[0].click();
      skipped++;
      return;
    }
  } catch (e) {}
}
chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  skipAd();
  if(response && response.url) {
    for(var u in urls) {
      if(response.url.match(urls[u])) {
        skipped = 1;
        break;
      }
    }
  }
  sendResponse({host:location.hostname, skipped:skipped});
  skipped =0;
});