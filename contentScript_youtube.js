function blockAd() {
  disableAd();
  skipAd();
  function disableAd() {
    if (this.ytplayer && this.ytplayer.config) {
      this.ytplayer.config.loaded = false;
      if (
        this.ytplayer.config.args &&
        this.ytplayer.config.args.raw_player_response
      ) {
        delete this.ytplayer.config.args.raw_player_response.adPlacements;
        delete this.ytplayer.config.args.raw_player_response.playerAds;
      }
    }
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
        playerAds.style.display = "none";
      }
      if (skipbutton && skipbutton.length > 0) {
        skipbutton[0].click();
        return;
      }
      // var player = document.querySelector("#ytd-player");
      // if (player && player.getPlayer() && player.getPlayer().getAdState() === 1) {
      //   // location.href = player.getPlayer().getVideoUrl();
      // }
    } catch (e) {}
  }

  setInterval(async () => {
    skipAd();
  }, 500);
}

var script = document.createElement("script");
script.appendChild(document.createTextNode("(" + blockAd + ")();"));
(document.body || document.head || document.documentElement).appendChild(
  script
);
