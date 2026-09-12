"use strict";

async function insertRating(row) {
  const container = row.querySelector("div.Panel[tabindex] > div");

  if (container.querySelector(".gameslistitems_ProtonRating")) {
    return true;
  }

  const url = row.querySelector("a.Focusable[tabindex]").href;
  const rating = await getRatingElement(parseAppId(url));

  const item = document.createElement("div");
  const label = document.createElement("div");

  item.className = "gameslistitems_ProtonRating";
  label.className = "gameslistitems_ProtonRatingLabel";

  label.textContent = "ProtonDB";
  item.append(label);
  item.append(rating);

  container.append(item);
}

function insertRatings() {
  const rows = document.querySelectorAll("div[style] > div.Panel[tabindex]");

  for (const row of rows) {
    insertRating(row.parentNode);
  }

  setTimeout(insertRatings, 1000);
}

insertRatings();

