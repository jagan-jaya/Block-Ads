function blockAd() {
    disableAd();
  function disableAd(){
    if (this.yt && this.yt.config_.config_) {
        this.yt.config_.config_.openPopupConfig = {};
        this.yt.config_.DISABLE_WARM_LOADS = true;
      }
      if (this.ytplayer && this.ytplayer.config) {
        console.log("==");
        this.ytplayer.config.loaded = false;
        delete this.ytplayer.config.args.raw_player_response.adPlacements;
        delete this.ytplayer.config.args.raw_player_response.playerAds;
      }
  }

  setInterval(async () => {
    var skipbutton = document.getElementsByClassName("ytp-ad-skip-button");
    var bannerBtn = document.querySelector(".ytp-ad-overlay-close-button");
    var dismissBtn = document.querySelector("ytd-button-renderer#dismiss-button");
    var playerAds = document.querySelector("#player-ads");
    if (bannerBtn) {
      bannerBtn.click();
    }
    if (dismissBtn) {
      dismissBtn.click();
    }
    if(playerAds)
    {
        playerAds.style.display="none";
    }
    if (skipbutton.length > 0) {
      skipbutton[0].click();
      return;
    }
    setTimeout(() => {
        var mng = this.ytPubsubPubsubInstance && this.ytPubsubPubsubInstance.u[3] ? this.ytPubsubPubsubInstance.u[3].element : undefined;
        if(mng && (mng.isAd || document.querySelector(".ytp-ad-player-overlay-skip-or-preview")))
        {
            window.location.href = mng.getVideoUrl()
            location.reload();
        }
    }, 500);
  }, 500);
}
var script = document.createElement("script");
script.appendChild(document.createTextNode("(" + blockAd + ")();"));
(document.body || document.head || document.documentElement).appendChild(
  script
);
