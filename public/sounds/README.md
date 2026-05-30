# Game sounds

| File | Used for |
|------|----------|
| `card-tap.ogg` | Every card flip / tap |
| `game-win.wav` | When all pairs are matched |
| `play-again.ogg` | "Play again" button on the win modal |

Paths are configured in `src/constants/sounds.js` (volume levels too).

If a file is missing or fails to play, the app falls back to built-in synthetic sounds.
