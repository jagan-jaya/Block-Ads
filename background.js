"use strict";
let count = (localStorage["ba.count"] && parseInt(localStorage["ba.count"])) || 0;
let isExtensionEnabled = localStorage["ba.isExtensionEnabled"] || true;
isExtensionEnabled = isExtensionEnabled === "false" ? false : true;
let siteWiseCount = (localStorage["ba.siteWiseCount"] && JSON.parse(localStorage["ba.siteWiseCount"])) || {};
let isLoading = true;

chrome.browserAction.setBadgeText({ text: count ? "" + count : "" });

chrome.runtime.onInstalled.addListener(function () {
  console.log("Ready to Skip Ads");
  chrome.browserAction.setBadgeBackgroundColor({ color: "#34af6c" });
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd === "setOnOffState") {
    isExtensionEnabled = request.data.value;
    persistData();
  }
  if (request.cmd === "getOnOffState") {
    sendResponse(isExtensionEnabled);
  }
  if (request.cmd === "getSiteWiseCount") {
    count = 0;
    updateBlockedADs();
    sendResponse(siteWiseCount);
  }
});

function updateBlockedADs(res, details) {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
    chrome.browserAction.setBadgeBackgroundColor({ color: "red" });
    chrome.browserAction.setBadgeText({ text: "-1" });
    return;
  }
  if (res) {
    chrome.browserAction.setBadgeBackgroundColor({ color: "#34af6c" });
    var url = res.host;
    var t = res.skipped ? res.skipped : 0;
    count += t;
    var temp = siteWiseCount[url] ? siteWiseCount[url] + t : t;
    delete siteWiseCount[url];
    siteWiseCount[url] = temp;
  }
  persistData();
  var cText = count ? "" + count : "";
  chrome.browserAction.setBadgeText({ text: cText });
}

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (isExtensionEnabled) {
      if (details.tabId && details.tabId >= 0) {
        chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
          isLoading = true;
          if (info.status === 'complete' && tabId === details.tabId) {
            isLoading = false;
              chrome.tabs.onUpdated.removeListener(listener);
              chrome.tabs.sendMessage(details.tabId, {}, updateBlockedADs);
          }
        });
        if(!isLoading)
        {
          if(chrome.runtime && !!chrome.runtime.getManifest()) {
            chrome.tabs.sendMessage(details.tabId, {}, updateBlockedADs);
          }
        }
      }
      return { cancel: true };
    }
  },
  {
    urls: [
      "https://connect.facebook.net/en_US/fbadnw*-tag.js",
      "https://connect.facebook.net/en_US/fbadnw.js",
      "*://*.adsrvr.org/*",
      "https://ads.avocet.io/*",
      "https://ads.avct.cloud/*",
      "https://ads.pictela.net/*",
      "https://www.bing.com/rp/*.js",
      "*://www.googletagmanager.com/gtm.js*",
      "*://s.yimg.com/rq/darla/*/g-r-min.js",
      "*://*.ads-twitter.com/*",
      "*://*.moatads.com/*",
      "*://cdn.concert.io/*/concert-ads/*",
      "*://concertads-configs.vox-cdn.com/*",
      "*://ads.rubiconproject.com/*",
      "*://mail-ads.google.com/*/ads/*",
      "*://www.youtube.com/get_video_info*el=adunit*",
      "*://www.youtube.com/get_midroll_info*",
      "*://googleads.g.doubleclick.net/*",
      "*://www.google.com/pagead/*",
      "*://*.g.doubleclick.net/*",
      "*://www.google.co.in/pagead/*",
      "*://static.doubleclick.net/*",
      "*://*.googlevideo.com/videoplayback",
      "*://www.youtube.com/pagead/*",
      "*://www.youtube.com/*/ads/*",
      "*://ad.doubleclick.net/*",
      "*://pagead2.googlesyndication.com/*",
      "*://www.googleadservices.com/*",
      "*://cdn.adpushup.com/*",
      "*://*.adpushup.com/*",
      "*://*.buysellads.com/*",
      "*://*.adrecover.com/*",
      "*://adpushup-d.openx.net/*",
      "*://*.buysellads.net/*",
      "*://*.google.com/adsense/*",
      "*://adservice.google.com/*",
      "*://*.ads.linkedin.com/*",
      "*://www.linkedin.com/ad/*",
      "*://www.linkedin.com/tscp-serving/*",
      "*://hesads.akamaized.net/*",
      "*://www.google.com/ads/*",
      "*://*.taboola.com/*",
      "*://*.outbrain.com/*",
      "*://*.clmbtech.com/*",
      "*://*.akamized.com/*",
      "*://*.finadsr.com/*",
      "*://ads.pubmatic.com/*",
      "*://*.pubmatic.com/*",
      "*://*.adcolony.com/*",
      "*://*.hitapps/*",
      "*://*.onemobile.yahoo.com/admax/*",
      "*://ad.afy11.net/*",
      "*://*.moatads.com/*",
      "*://*.advertising.com/*",
      "*://*.adtechus.com/*",
      "*://*.atwola.com/*",
      "*://*.yimg.com/*/ads/*",
      "https://edgecast-vod.yimg.com/geminivideoads/*",
      // "*://s.yimg.com/aaq/yc/js/tdv2-service-ads*",
      // "*://s.yimg.com/aaq/yc/js/td-ads*",
      "*://*.yahoo.com/*/ads/*",
      "*://*.contextads.live/*",
      "*://*.adsrvr/*",
      "*://*/adserver/*",
      "*://*/AdServing/*",
      "*://*.smartadserver.com/*",
      "*://*.playstream.media/*",
      "*://*.vdo.ai/*",
      "*://*.indiatimes.com/*/admanagement/*",
      "*://*.indiatimes.com/*/coupondunai/*",
      "*://*.indiatimes.com/times-affiliates/tas/*",
      "*://*.rubiconproject.com/*",
      "*://*.adnxs.com/*",
      "*://*.amazon-adsystem.com/*",
      "*://ads.ndtv1.com/*",
      "*://adsmedia.zee5.com/*",
      "*://*.kostprice.com/*",
      "*://*.gadgets360.com/pricee/*",
      "*://*.ndtv.com/ajax/sponsored-widget/*",
      "*://anewsa.com/advert_view.php^",
      "*://*.reddit.com/*/sidebar_ads*",
      "*://*.reddit.com/*/comments_page_ads*",
      "*://*.aaxads.com/*",
      "*://*.adobe.com/adserver/*",
      "*://*.amazon.com/e/xsp/getAd",
      "*://*.amazon-adsystem.com/e/xsp/getAd",
      "*://*.amazon-adsystem.com/e/xsp/getAdj",
      "*://*.amazon-adsystem.com/x/getad",
      "*://ad.applead.co.kr/*"
    ],
  },
  ["blocking"]
);

chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (isExtensionEnabled) {
      if (details.tabId && details.tabId >= 0) {        
        chrome.tabs.sendMessage(details.tabId, {}, updateBlockedADs);
      }
    }
  },
  {
    urls: [
      "https://media-exp1.licdn.com/dms/image/*",
      "https://www.facebook.com/ajax/bnzai*"
    ],
  }
);

function persistData() {
  localStorage["ba.count"] = count;
  localStorage["ba.isExtensionEnabled"] = isExtensionEnabled;
  localStorage["ba.siteWiseCount"] = JSON.stringify(siteWiseCount);
}
