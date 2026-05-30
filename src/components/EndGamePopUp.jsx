import { useCallback } from 'react';
import { playPlayAgain } from '../utils/gameAudio';

const EndGamePopUp = ({ moves, onPlayAgain }) => {
  const handlePlayAgain = useCallback(() => {
    playPlayAgain();
    onPlayAgain();
  }, [onPlayAgain]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="end-title"
    >
      <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl ring-1 ring-slate-200 sm:p-8">
        <div className="mb-3 text-5xl sm:text-6xl" aria-hidden>
          🎉
        </div>
        <h2
          id="end-title"
          className="mb-2 text-2xl font-bold text-slate-800 sm:text-3xl"
        >
          You found them all!
        </h2>
        <p className="mb-6 text-slate-600">
          Great job matching every fruit pair.
        </p>
        <p className="mb-6 text-xl font-bold text-indigo-600 sm:text-2xl">
          {moves} {moves === 1 ? 'move' : 'moves'}
        </p>
        <button
          type="button"
          onClick={handlePlayAgain}
          className="w-full cursor-pointer rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] sm:w-auto sm:px-10"
        >
          Play again
        </button>
      </div>
    </div>
  );
};

export default EndGamePopUp;
