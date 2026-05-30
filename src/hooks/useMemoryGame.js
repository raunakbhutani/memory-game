import { useCallback, useEffect, useRef, useState } from 'react';
import { FLIP_MISMATCH_MS } from '../constants/game';
import { createShuffledDeck, PAIR_COUNT } from '../data/fruits';
import { playCardTap, playGameWin } from '../utils/gameAudio';

/**
 * Memory match game: deck, flips, matches, moves, win state, and new-game reset.
 */
export function useMemoryGame() {
  const [cards, setCards] = useState(() => createShuffledDeck());
  const [flippedIds, setFlippedIds] = useState([]);
  const [matchedPairIds, setMatchedPairIds] = useState(() => new Set());
  const [moves, setMoves] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const mismatchTimeoutRef = useRef(null);

  const isPairPickComplete = flippedIds.length === 2;

  const startNewGame = useCallback(() => {
    if (mismatchTimeoutRef.current != null) {
      window.clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }
    setCards(createShuffledDeck());
    setFlippedIds([]);
    setMatchedPairIds(new Set());
    setMoves(0);
    setGameEnd(false);
  }, []);

  const isFaceUp = useCallback(
    (card) => flippedIds.includes(card.id) || matchedPairIds.has(card.pairId),
    [flippedIds, matchedPairIds],
  );

  const handleCardSelect = useCallback(
    (card) => {
      if (gameEnd) return;
      if (matchedPairIds.has(card.pairId)) return;
      if (flippedIds.includes(card.id)) return;
      if (flippedIds.length >= 2) return;

      const nextFlipped = [...flippedIds, card.id];
      setFlippedIds(nextFlipped);
      playCardTap();

      if (nextFlipped.length < 2) return;

      setMoves((m) => m + 1);

      const [id1, id2] = nextFlipped;
      const c1 = cards.find((c) => c.id === id1);
      const c2 = cards.find((c) => c.id === id2);
      if (!c1 || !c2) return;

      if (c1.pairId === c2.pairId) {
        const completesGame = matchedPairIds.size + 1 === PAIR_COUNT;
        setMatchedPairIds((prev) => {
          const next = new Set(prev);
          next.add(c1.pairId);
          return next;
        });
        if (completesGame) {
          setGameEnd(true);
          playGameWin();
        }
        setFlippedIds([]);
        return;
      }

      if (mismatchTimeoutRef.current != null) {
        window.clearTimeout(mismatchTimeoutRef.current);
        mismatchTimeoutRef.current = null;
      }
      mismatchTimeoutRef.current = window.setTimeout(() => {
        mismatchTimeoutRef.current = null;
        setFlippedIds([]);
      }, FLIP_MISMATCH_MS);
    },
    [cards, flippedIds, gameEnd, matchedPairIds],
  );

  useEffect(() => {
    return () => {
      if (mismatchTimeoutRef.current != null) {
        window.clearTimeout(mismatchTimeoutRef.current);
      }
    };
  }, []);

  return {
    cards,
    moves,
    pairsFound: matchedPairIds.size,
    totalPairs: PAIR_COUNT,
    gameEnd,
    startNewGame,
    handleCardSelect,
    isFaceUp,
    isPairPickComplete,
  };
}
