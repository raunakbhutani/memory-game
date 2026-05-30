import { SOUND_PATHS, SOUND_VOLUME } from '../constants/sounds';

let audioUnlocked = false;
let audioContext = null;

const fileCache = new Map();

const SOUND_CONFIG = {
  tap: { src: SOUND_PATHS.cardTap, volume: SOUND_VOLUME.cardTap },
  win: { src: SOUND_PATHS.gameWin, volume: SOUND_VOLUME.gameWin },
  playAgain: { src: SOUND_PATHS.playAgain, volume: SOUND_VOLUME.playAgain },
};

function getFileAudio(key) {
  if (!fileCache.has(key)) {
    const { src, volume } = SOUND_CONFIG[key];
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.volume = volume;
    fileCache.set(key, audio);
  }
  return fileCache.get(key);
}

function getAudioContext() {
  if (!audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioContext = new Ctx();
  }
  return audioContext;
}

/** Browsers block audio until a user gesture — call on first card tap. */
export function unlockGameAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  const ctx = getAudioContext();
  if (ctx?.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const tap = getFileAudio('tap');
  tap
    .play()
    .then(() => {
      tap.pause();
      tap.currentTime = 0;
    })
    .catch(() => {});

  getFileAudio('win').load();
  getFileAudio('playAgain').load();
}

function playSyntheticTap() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(520, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.09);
}

function playSyntheticWin() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5];
  const start = ctx.currentTime;

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const t = start + i * 0.12;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.14, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.36);
  });
}

function playSyntheticPlayAgain() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.16);
}

async function playFileSound(key) {
  const template = getFileAudio(key);
  const audio = template.cloneNode();
  audio.volume = template.volume;
  await audio.play();
}

export async function playCardTap() {
  unlockGameAudio();
  try {
    await playFileSound('tap');
  } catch {
    playSyntheticTap();
  }
}

export async function playGameWin() {
  unlockGameAudio();
  try {
    await playFileSound('win');
  } catch {
    playSyntheticWin();
  }
}

/** When the user taps "Play again" on the win modal. */
export async function playPlayAgain() {
  unlockGameAudio();
  try {
    await playFileSound('playAgain');
  } catch {
    playSyntheticPlayAgain();
  }
}
