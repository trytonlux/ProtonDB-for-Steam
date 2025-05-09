"use strict";

const PROTONDB_HOMEPAGE = "https://www.protondb.com";

function parseAppId(url) {
  var appid = url.match(/\/(app)\/([0-9]{1,7})/);

  return parseInt(appid[2], 10);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function protondbRequestRating(appid) {
  return browser.runtime.sendMessage({
    contentScriptQuery: "queryRating",
    appid: appid,
  });
}

function getRatingElement(appid) {
  var element = document.createElement("a");

  element.classList.add("protondb_rating_link");

  element.href = `${PROTONDB_HOMEPAGE}/app/${appid}`;
  element.target = "_blank";

  protondbRequestRating(appid).then((rating) => {
    if (rating === "pending") {
      element.textContent = "Awaiting reports!";
    } else {
      element.textContent = rating;
      element.classList.add(`protondb_rating_${rating}`);
    }
  });

  return element;
}

function getRatingIcon(appid) {
  var element = document.createElement("a");

  element.classList.add("protondb_rating_icon");

  element.href = `${PROTONDB_HOMEPAGE}/app/${appid}`;
  element.target = "_blank";

  protondbRequestRating(appid).then((rating) => {
    if (rating === "pending") {
      element.title = "Awaiting reports!";
    } else {
      element.title = capitalize(rating);
      element.classList.add(`protondb_rating_${rating}`);
    }

    element.textContent = "⚛"
  });

  return element;
}
