// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// Downloaded from https://www.forbes.com/digital-assets/assets/chudjak-chud/
import chudUrl from "./assets/chud.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const title = document.createElement("h1");
title.textContent = "Chud Clicker";

const image = document.createElement("img");
image.src = chudUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

const heading = document.createElement("P");
heading.textContent = "It's time to chud out. Click that chud!";

let chuds = 0;
let chudPerClick = 1;
let CpcUpgradeCost = 10;
const autoChuddersCost = 25;
const autoChudders = 0;

const message = document.createElement("P");

const chudbutton = document.createElement("button");
chudbutton.textContent = "Chud Out!";
chudbutton.type = "button";

chudbutton.addEventListener("click", () => {
  chuds += chudPerClick;
});

const chudPerClickUpgrader = document.createElement("button");
chudPerClickUpgrader.textContent = "Increase to " + (chudPerClick + 1) +
  " Chuds Per Click (Costs " +
  CpcUpgradeCost + " Chuds)";
chudPerClickUpgrader.type = "button";

const autoChuddersUpgrade = document.createElement("button");
autoChuddersUpgrade.textContent = "Purchase Auto-Chudder";
autoChuddersUpgrade.type = "button";

chudPerClickUpgrader.addEventListener("click", () => {
  if (chuds < CpcUpgradeCost) {
    return;
  }
  chuds -= CpcUpgradeCost;
  chudPerClick += 1;
  CpcUpgradeCost = Math.ceil(CpcUpgradeCost * 1.67);
  message.textContent = chuds + " Chuds";
  chudPerClickUpgrader.textContent = "Increase to " + (chudPerClick + 1) +
    " Chuds Per Click (Costs " + CpcUpgradeCost + " Chuds)";
});

let lastUpdate = performance.now();
function update(now: number) {
  const seconds = (now - lastUpdate) / 1000;
  lastUpdate = now;
  chuds += autoChudders * seconds;
  if (chuds < CpcUpgradeCost) {
    chudPerClickUpgrader.disabled = true;
  } else {
    chudPerClickUpgrader.disabled = false;
  }

  if (chuds < autoChuddersCost) {
    autoChuddersUpgrade.disabled = true;
  } else {
    autoChuddersUpgrade.disabled = false;
  }

  if (chuds == 1) {
    message.textContent = chuds + " Chud";
  } else {
    message.textContent = chuds + " Chuds";
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

app.append(
  title,
  image,
  heading,
  message,
  chudbutton,
  chudPerClickUpgrader,
  autoChuddersUpgrade,
);
