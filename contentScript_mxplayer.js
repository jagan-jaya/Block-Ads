function blockAd() {
  setInterval(function () {
    try {
      var mng = this.adsManager;
      if (mng && mng.l && mng.l.g && mng.l.g.allAdsCompleted && mng.l.g.allAdsCompleted[0] && mng.l.g.allAdsCompleted[0] && mng.l.g.allAdsCompleted[0].listener) {
        mng.l.g.allAdsCompleted[0].listener();
        if (mng.B && mng.B.played && mng.B.played.length > 0) {
          mng.B.play();
        }
      }
    }
    catch (e) { }
  }, 1000);
}
var script = document.createElement("script");
script.appendChild(document.createTextNode("(" + blockAd + ")();"));
(document.body || document.head || document.documentElement).appendChild(
  script
);
