function blockAd() {
  setInterval(function () {
    var mng = this.adsManager;
    if (mng && mng.l && mng.l.g && mng.l.g.allAdsCompleted) {
      mng.l.g.allAdsCompleted[0].listener();
      if(mng.B.played.length > 0)
        mng.B.play();
    }
  }, 1000);
}
var script = document.createElement("script");
script.appendChild(document.createTextNode("(" + blockAd + ")();"));
(document.body || document.head || document.documentElement).appendChild(
  script
);
