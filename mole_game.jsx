import React, { useState, useEffect } from 'react';

export default function ClickGame() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [active, setActive] = useState(-1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || time <= 0) return;
    
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    const mole = setInterval(() => setActive(Math.floor(Math.random() * 9)), 800);
    
    return () => { clearInterval(timer); clearInterval(mole); };
  }, [playing, time]);

  useEffect(() => {
    if (time === 0) setPlaying(false);
  }, [time]);

  const start = () => {
    setScore(0);
    setTime(30);
    setPlaying(true);
  };

  const hit = (i) => {
    if (i === active && playing) {
      setScore(s => s + 1);
      setActive(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">🐹 두더지 잡기</h1>
        
        <div className="bg-white rounded-lg p-6 mb-4">
          <div className="flex gap-8 justify-center text-2xl font-bold">
            <div>점수: {score}</div>
            <div>시간: {time}초</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[...Array(9)].map((_, i) => (
            <button
              key={i}
              onClick={() => hit(i)}
              className={`w-24 h-24 rounded-2xl text-5xl transition-all ${
                active === i 
                  ? 'bg-yellow-400 scale-110' 
                  : 'bg-green-700'
              }`}
            >
              {active === i ? '🐹' : '🕳️'}
            </button>
          ))}
        </div>

        {!playing && (
          <button
            onClick={start}
            className="bg-white text-green-600 px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-all"
          >
            {time === 0 ? `다시 시작 (최종: ${score}점)` : '게임 시작'}
          </button>
        )}
      </div>
    </div>
  );
}
