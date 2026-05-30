import { useCallback } from 'react';

const CardItem = ({ card, faceUp, disabled, onSelect }) => {
  const handleClick = useCallback(() => {
    if (disabled || faceUp) return;
    onSelect();
  }, [disabled, faceUp, onSelect]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <div
      role="button"
      tabIndex={disabled || faceUp ? -1 : 0}
      aria-label={faceUp ? `${card.name}, matched or revealed` : 'Hidden card, press to flip'}
      aria-pressed={faceUp}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={[
        'card-flip aspect-square w-full min-h-0 outline-none select-none',
        disabled && !faceUp ? 'pointer-events-none opacity-60' : '',
        !disabled && !faceUp ? 'cursor-pointer' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={`card-flip-inner ${faceUp ? 'is-flipped' : ''}`}>
        <div className="card-face card-back flex items-center justify-center rounded-xl border-2 border-indigo-200/80 bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md ring-1 ring-white/30">
          <span
            className="text-2xl font-bold text-white drop-shadow sm:text-3xl md:text-4xl"
            aria-hidden
          >
            ?
          </span>
        </div>
        <div className="card-face card-front flex items-center justify-center rounded-xl border-2 border-emerald-200/90 bg-gradient-to-br from-amber-50 to-orange-50 p-1.5 shadow-md sm:p-2">
          <img
            src={card.image}
            alt={card.name}
            className="h-full w-full max-h-[min(100%,4.5rem)] object-contain drop-shadow-sm sm:max-h-[min(100%,5.5rem)]"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
