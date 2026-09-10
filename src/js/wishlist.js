"use strict";

function isFlex(div) {
  return getComputedStyle(div).display == "flex";
}

function hasStyleAttribute(div) {
  return div.hasAttribute("style");
}

async function insertRating(panel) {
  const row = [...panel.querySelectorAll("div")]
    .filter(isFlex)
    .filter(hasStyleAttribute)[0].parentNode;

  if (row.querySelector(".protondb_rating_link")) {
    return true;
  }

  var column = document.createElement("div");
  var label = document.createElement("div");
  var value = document.createElement("div");

  label.className = "label";
  value.className = "value";

  column.className = "protondb_row_wishlist";

  label.textContent = "ProtonDB:";
  column.append(label);

  const appid = parseAppId(panel.querySelector("a").href)
  value.append(getRatingElement(appid));
  column.append(value);

  row.append(column);
}

function insertRatings() {
  const panels = document.querySelectorAll("div.Panel[data-index]");

  for (const panel of panels) {
    insertRating(panel);
  }

  setTimeout(insertRatings, 1000);
}

insertRatings();
