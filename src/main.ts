// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"

// Downloaded from https://www.forbes.com/digital-assets/assets/chudjak-chud/
import chudUrl from "./assets/chud.svg?no-inline";

/*
//Setting up all of the game data and constants
interface UpgradeDef {
  id: string;
  name: string;
  baseCost: number;
  costGrowth: number;
  clickBonus: number;
  perSecond: number;
}

const UPGRADES: UpgradeDef[] = [
  {
    id: "clickPower",
    name: "Stronger Chud Click",
    baseCost: 10,
    costGrowth: 1.67,
    clickBonus: 1,
    perSecond: 0,
  },
  {
    id: "autoChudder",
    name: "Auto-Chudder",
    baseCost: 25,
    costGrowth: 1.67,
    clickBonus: 0,
    perSecond: 1,
  },
];

const CATCHPHRASES = [
  "Get your hands off me NPC!",
  "How about you go touch grass instead?",
  "Step back, I am a highvalue male!",
  "I knew you could see my inner alpha",
  "The West had fallen, billions must die",
  "Soy!",
];

const BASE_CLICK_POWER = 1;
const GAMBLE_WIN_CHANCE = 0.5;

//Set up the game state and its logic, without touching the DOM
interface GameState {
  chuds: number;
  owned: Record<string, number>;
}

const state: GameState = {
  chuds: 0,
  owned: Object.fromEntries(UPGRADES.map((u) => [u.id, 0])),
};

function costOf(def: UpgradeDef): number {
  return Math.ceil(
    def.baseCost * Math.pow(def.costGrowth, state.owned[def.id]),
  );
}

function canAfford(def: UpgradeDef): boolean {
  return state.chuds >= costOf(def);
}

function chudsPerClick(): number {
  return UPGRADES.reduce(
    (sum, u) => sum + u.clickBonus * state.owned[u.id],
    BASE_CLICK_POWER,
  );
}

function chudsPerSecond(): number {
  return UPGRADES.reduce((sum, u) => sum + u.perSecond * state.owned[u.id], 0);
}

function purchase(def: UpgradeDef): boolean {
  if (!canAfford(def)) return false;
  state.chuds -= costOf(def);
  state.owned[def.id] += 1;
  return true;
}

function tick(seconds: number): void {
  state.chuds += chudsPerSecond() * seconds;
}

function gamble(): boolean {
  const won = Math.random() < GAMBLE_WIN_CHANCE;
  state.chuds = won ? state.chuds * 2 : 0;
  return won;
}
*/

const app = document.querySelector<HTMLElement>("#app")!;

const title = document.createElement("h1");
title.textContent = "Chud Clicker";

const image = document.createElement("img");
image.src = chudUrl;
image.alt = "A teal tile with a cream circle";
image.width = 500;
image.height = 500;

const heading = document.createElement("P");
heading.textContent = "It's time to chud out. Click me!";

let chuds = 0;
let chudPerClick = 1;
let CpcUpgradeCost = 10;
let autoChuddersCost = 25;
let autoChudders = 0;

const message = document.createElement("P");

const speech = document.createElement("P");

const chudbutton = document.createElement("button");
chudbutton.textContent = "Chud Out!";
chudbutton.type = "button";

chudbutton.addEventListener("click", () => {
  chuds += chudPerClick;
  speech.textContent = "";
  heading.style.display = "none";
});

image.addEventListener("click", () => {
  chuds += chudPerClick;
  heading.style.display = "none";
  speech.textContent =
    chudCatchphrases[Math.floor(Math.random() * chudCatchphrases.length)];
});

const chudCatchphrases = [
  "Get your hands off me NPC!",
  "How about you go touch grass instead?",
  "Step back, I am a highvalue male!",
  "I knew you could see my inner alpha",
  "The West had fallen, billions must die",
  "Soy!",
];

const chudPerClickUpgrader = document.createElement("button");
chudPerClickUpgrader.textContent = "Increase to " + (chudPerClick + 1) +
  " Chuds Per Click (Costs " + CpcUpgradeCost + " Chuds)";
chudPerClickUpgrader.type = "button";

const autoChuddersUpgrader = document.createElement("button");
autoChuddersUpgrader.textContent = "Purchase Auto-Chudder" + " (Costs " +
  autoChuddersCost + " Chuds)";
autoChuddersUpgrader.type = "button";

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
  chudPerClickMessage.textContent = "Chuds Per Click: " + chudPerClick;
});

autoChuddersUpgrader.addEventListener("click", () => {
  if (chuds < autoChuddersCost) {
    return;
  }
  chuds -= autoChuddersCost;
  autoChudders += 1;
  autoChuddersCost = Math.ceil(autoChuddersCost * 1.67);
  autoChuddersUpgrader.textContent = "Purchase Auto-Chudder" + " (Costs " +
    autoChuddersCost + " Chuds)";
  autoChuddersMessage.textContent = "Auto-Chudders: " + autoChudders;
});

const gamblingButton = document.createElement("button");
gamblingButton.textContent = "Gamble for Chuds!";
gamblingButton.type = "button";

gamblingButton.addEventListener("click", () => {
  if (Math.random() < 0.5) {
    chuds = 0;
    speech.textContent = "Nothing ever happens...";
  } else {
    chuds *= 2;
    speech.textContent = "Happy Chudmas! We've multipled!";
  }
});

const chudPerClickMessage = document.createElement("P");
chudPerClickMessage.textContent = "Chuds Per Click: " + chudPerClick;

const autoChuddersMessage = document.createElement("P");
autoChuddersMessage.textContent = "Auto-Chudders: " + autoChudders;

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
    autoChuddersUpgrader.disabled = true;
  } else {
    autoChuddersUpgrader.disabled = false;
  }

  if (chuds == 1) {
    message.textContent = Math.floor(chuds) + " Chud";
  } else {
    message.textContent = Math.floor(chuds) + " Chuds";
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

app.append(
  title,
  image,
  speech,
  heading,
  message,
  chudbutton,
  chudPerClickUpgrader,
  autoChuddersUpgrader,
  gamblingButton,
  chudPerClickMessage,
  autoChuddersMessage,
);
