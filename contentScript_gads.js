let skippedAds = 0;
var querySelectors = [
    ".amazon-best-sellers",
    "*[title~='advertisement']",
    ".sponsor_stories",
    "*[data-before-content~='advertisement']",
    //https://in.yahoo.com/
    "*[data-content~='Advertisement']",
    "*[data-content~='ADVERTISEMENT']",
    "*.searchRightBottomAds",
    "*.searchCenterTopAds",
    "*.searchCenterBottomAds",
    "*.native-ad-item",
    "#my-adsFOOT",
    "#my-adsMON",
    //www.indiatimes.com
    ".article-between-wrap .flash-sale",
    ".article-between-wrap .shop-cont",
    ".article-between-wrap .flash-container",
    "*[class*='advertisement']",
    //google
    "#center_col #tads",
    "#center_col #bottomads",
    //https://www.reddit.com/
    ".Post.promotedlink",
    ".Post.promotedvideolink",
    ".darla-container",
    ".bs-vc-wrapper.m_adbg",
    //puthiya_thalaimurai
    ".rgt_ad",
    //https://www.forbes.com/
    ".top-ad-container",
    ".footer-ad-labeling",
    //linkedin
    "section.ad-banner-container",
    //youtube
    ".ytp-ad-action-interstitial",
    "#masthead-ad"
];
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    skipAd();
    skippedAds = skippedAds ? skippedAds : 1;
    sendResponse({host:location.hostname, skipped:skippedAds});
    skippedAds=0;
});
chrome.extension.sendMessage({ cmd: "getOnOffState" }, function (res) {
    if (res) {
        var style = document.createElement("style");
        var content = '';
        querySelectors.forEach(s => content += ":root "+s+",");
        style.appendChild(document.createTextNode(content+"#advertisemet{display: none !important;}"));
        (document.body || document.head || document.documentElement).appendChild(
            style
        );
        skipAd();
    }
});
function hideParent(e){
    let t = e.parentElement;
    e.parentNode.removeChild(e);
    skippedAds++;
    e = t;
    while(e && e.innerText === "")
    {
        t = e;
        e = e.parentElement;
    }
    e !== t && e.removeChild(t);
}
function skipAd() {
    // querySelectors.forEach(qs => document.querySelectorAll(qs).forEach(e => hideParent(e)));
    Array.from(document.querySelectorAll('*')).filter(el => el && el.innerText && el.innerText.toLowerCase().match(/^[^A-Za-z0-9]*(advertisements?|sponsored|promoted)[^A-Za-z0-9]*$/)).forEach(e => { e.parentNode.removeChild(e);});  
}