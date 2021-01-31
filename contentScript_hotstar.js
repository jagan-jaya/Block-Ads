function blockAd() {
  var tab = this;
  if (tab.APP_CONFIG && tab.APP_CONFIG.junu && tab.APP_CONFIG.junu.AD_CONFIG) {
    tab.APP_CONFIG.junu.AD_CONFIG.disable_ads_mweb_vod = true;
    tab.APP_CONFIG.junu.AD_CONFIG_V1.disable_ads_mweb_vod = true;
    tab.APP_CONFIG.junu.AD_CONFIG_V1.disable_video_ads = true;
  }
}
chrome.extension.sendMessage({ cmd: "getOnOffState" }, function (res) {
  if (res) {
    var script = document.createElement("script");
    script.appendChild(document.createTextNode("(" + blockAd + ")();"));
    (document.body || document.head || document.documentElement).appendChild(
    script
    );
  }
});

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  blockAd();
  sendResponse({ host: location.hostname, skipped: 1 });
});
