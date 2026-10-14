# Chud Clicker

Chud Clicker is an incremental clicker game themed around the internet subculture of Chuds.
You can click either the chud or the Chud Out! button to get chuds and then spend them on mutliple different upgrades.
You can also try to double or nothing your money at any time using the gambling button.

**Play it:** [https://dtubman.github.io/CMPM121-D1-ClickerGame/]

## How to play

- Click the image or the Chud Out! button to earn Chuds. Clicking the
  image of the chud also makes the Chud say a random catchphrase as an easter egg.
- Purchase the "Increase to X Chuds per click" button to earn more every time you click either option.
- Click the "Purchase Auto-Chudder" button to buy one and start earning 1 Chud per second each automatically.
- Each purchase raises that upgrade's next price by 2/3 and buttons are disabled when you can't afford them.
- Clicking the "Gamble for Chuds!" button gives you a 50/50 chance to double your Chuds or lose them all with some flavor text for each outcome.

## Run and build

```bash
# start the dev server
[deno task dev]

# production build
[deno task build]
```

## For developers

### Where things live

Everything is in [src/main.ts], top to bottom:

| What                                                                | Where in [src/main.ts]                                   |
| ------------------------------------------------------------------- | -------------------------------------------------------- |
| Game state (`chuds`, `chudPerClick`, `autoChudders`, upgrade costs) | `let` variables near the top                             |
| Click, upgrade, and gamble behavior                                 | `addEventListener` handlers for each button              |
| Timed production (Auto-Chudders)                                    | the `update` function, driven by `requestAnimationFrame` |
| Button enabling and the Chud counter                                | the `update` function                                    |
| Catchphrases                                                        | the `chudCatchphrases` array                             |
| Imported asset                                                      | `src/assets/chud.svg`, imported through Vite             |

Production uses elapsed seconds from `performance.now()`, not frame counts, so it behaves the same at any frame rate.

### Design revision

Smell:

Principle:

Easier:

## Credits

- Chud image: downloaded from
  [https://www.forbes.com/digital-assets/assets/chudjak-chud/]
