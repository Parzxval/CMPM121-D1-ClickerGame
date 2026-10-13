// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// Downloaded from TODO:Credit Image
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

/* TODO: Use these to keep track of gamestate and implement upgrades
let chudPerClick = 1;
let upgradeCost = 10;
let autoChudders = 0;
let autoChuddersUpgrade = 40;
*/

const message = document.createElement("P");

setInterval(() => {
  if (chuds == 1) {
    message.textContent = chuds + " Chud";
  } else {
    message.textContent = chuds + " Chuds";
  }
}, 100);

setInterval(() => {
  chuds += 1;
}, 1000);

const chudbutton = document.createElement("button");
chudbutton.textContent = "Chud Out!";
chudbutton.type = "button";

chudbutton.addEventListener("click", () => {
  chuds++;
});

app.append(title, image, heading, message, chudbutton);
