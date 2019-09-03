var item = document.getElementById("sellerProfileTriggerId");
if (item){
    if (document.getElementsByClassName("seller-countryFlag") !== undefined){
    var ref = item.href;
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "document";
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let sellerInfo = this.response.getElementsByClassName("a-row a-spacing-medium")[1];
        var list = sellerInfo.getElementsByTagName("UL")[0];
        var sellerInfoItems = list.getElementsByTagName("LI");
        var le = sellerInfoItems.length;
        var location = sellerInfoItems[le-1].innerText;
        appendCountryinfo(location);
      }
    };

    xhttp.open("GET", ref, true);
    xhttp.send();
    }
}


function appendCountryinfo(location){
  let countryName = "" +location.toLowerCase() + ".png";
  let countryImageURL = browser.extension.getURL("Flags/"+countryName);

  var toReplace =  document.getElementById("merchant-info");
  var div = document.createElement("div");
  div.className = "seller-countryFlag";
  var header = document.createElement("h3");
  header.textContent = getTranslatedHeader(location);
  div.appendChild(header);
  var img = document.createElement("img");
  img.src = countryImageURL;
  div.appendChild(img);
  toReplace.appendChild(div);
}

function getTranslatedHeader(country){
  let lang = browser.i18n.getUILanguage()+"";
  switch (lang){
    case "de": return "Verkäufer mit Sitz in: " + country;
    default: return "Seller located in: " + country;
  }

}