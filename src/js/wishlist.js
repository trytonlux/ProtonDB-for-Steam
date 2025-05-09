"use strict";

function isFlex(div) {
  return getComputedStyle(div).display == "flex";
}

function hasSpanChild(div) {
  return div.childNodes[0].nodeName == "SPAN";
}

async function insertRating(panel) {
  const row = [...panel.querySelectorAll("div")]
    .filter(isFlex)
    .filter(hasSpanChild)[0].childNodes[0];

  if (row.querySelector(".protondb_rating_icon")) {
    return true;
  }

  const appid = parseAppId(panel.querySelector("a").href);
  const rating = getRatingIcon(appid);

  row.append(rating);
}

function insertRatings() {
  const panels = document.querySelectorAll("div.Panel[data-index]");

  for (const panel of panels) {
    insertRating(panel);
  }

  setTimeout(insertRatings, 1000);
}

insertRatings();
