import './App.css';
import CardItem from './components/CardItem';
import EndGamePopUp from './components/EndGamePopUp';
import { useMemoryGame } from './hooks/useMemoryGame';

const App = () => {
  const {
    cards,
    moves,
    pairsFound,
    totalPairs,
    gameEnd,
    startNewGame,
    handleCardSelect,
    isFaceUp,
    isPairPickComplete,
  } = useMemoryGame();

  return (
    <div className="flex min-h-svh flex-col items-center bg-gradient-to-br from-indigo-100 via-violet-50 to-rose-100 px-3 py-4 sm:px-6 sm:py-8">
      <header className="mb-6 flex w-full max-w-3xl flex-col items-center text-center sm:mb-8">
        <h1 className="bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-600 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Fruit Memory Game
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg">
          Flip two cards at a time and find all matching pairs.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
          <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-md ring-1 ring-slate-200/80 sm:text-lg">
            Moves:{' '}
            <span className="tabular-nums text-indigo-600">{moves}</span>
          </div>
          <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-md ring-1 ring-slate-200/80 sm:text-lg">
            Pairs:{' '}
            <span className="tabular-nums text-emerald-600">
              {pairsFound}
            </span>{' '}
            / {totalPairs}
          </div>
        </div>
      </header>

      <main className="w-full max-w-3xl flex-1 px-1 sm:px-0">
        <div className="rounded-2xl border border-white/60 bg-white/70 p-3 shadow-xl shadow-indigo-200/40 backdrop-blur-sm sm:p-6">
          <div className="mx-auto grid w-full max-w-[min(100%,42rem)] auto-rows-fr grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">
            {cards.map((card) => {
              const faceUp = isFaceUp(card);
              const disabled = gameEnd || (isPairPickComplete && !faceUp);
              return (
                <CardItem
                  key={card.id}
                  card={card}
                  faceUp={faceUp}
                  disabled={disabled}
                  onSelect={() => handleCardSelect(card)}
                />
              );
            })}
          </div>
        </div>
      </main>

      <footer className="mt-6 shrink-0">
        <button
          type="button"
          onClick={startNewGame}
          className="cursor-pointer rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:from-rose-600 hover:to-orange-600 hover:shadow-xl active:scale-[0.98] sm:px-8 sm:py-3 sm:text-base"
        >
          New game
        </button>
      </footer>

      {gameEnd && (
        <EndGamePopUp moves={moves} onPlayAgain={startNewGame} />
      )}
    </div>
  );
};

export default App;
