var isExtensionOn = true;
function toggleExtension(e) {
  isExtensionOn = !isExtensionOn;
  setOnOffState();
  getOnOffState();
};
function setOnOffState() {
    chrome.extension.sendMessage({
        cmd: "setOnOffState",
        data: { value: isExtensionOn },
      });
}
function getOnOffState() {
    chrome.extension.sendMessage({ cmd: "getOnOffState" }, function (res) {
        if (res) {
          isExtensionOn = res;
          document.querySelector(".extensionStatus").innerHTML = "Block Ads Enabled";
        } else {
          isExtensionOn = false;
          document.querySelector(".extensionStatus").innerHTML = "Block Ads Disabled";
          document.querySelector('.extensionToggleSwitch input').checked = false;
        }
      });
}
function getSiteWiseCount() {
    chrome.extension.sendMessage({ cmd: "getSiteWiseCount" }, function (res) {
        var tableData = "<tr><th>Site</th><th>Ads Skipped</th></tr>";
        if (res && Object.keys(res).length > 0) {
            var sortedRes = [];
            for(var k in res) {
              sortedRes.push([k, res[k]]);
            }
            // sortedRes.sort(function(a,b){ return b[1] - a[1];});
            for(var k = sortedRes.length-1; k>=0; k--) {
                tableData += "<tr><td>"+ sortedRes[k][0] + "</td><td>" + sortedRes[k][1] + "</td></tr>";
            }
          document.querySelector(".siteWiseStats").innerHTML = tableData;
        } 
      });
}
document.addEventListener("DOMContentLoaded", () => {
  chrome.browserAction.getBadgeText({}, (d)=>{ 
    console.log(d)
    if(d === '-1') {
      document.querySelector(".errorMessage").style.display = "block";
    }
    else
    {
      document.querySelector(".errorMessage").style.display = "none";
      getOnOffState();
      getSiteWiseCount()
      document.querySelector('.extensionToggleSwitch input').addEventListener('click', toggleExtension);
    }
  });
});
