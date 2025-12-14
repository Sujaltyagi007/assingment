import React from "react";

const DiceLoader = () => {
  const diceSize = 150;
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 perspective-[600px] h-screen w-screen bg-[#eef] overflow-hidden">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className={`dice absolute top-1/2 left-1/2 transform-style-preserve-3d animate-rotate${index}`}
        >
          <ol
            className="transform-style-preserve-3d"
            style={{
              transform: `translateY(-${diceSize / 2}px) translateX(-${diceSize / 2}px)`,
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => {
              const face = i + 1;
              const randomColor = `rgba(${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, 0.5)`;

              return (
                <li
                  key={face}
                  className="absolute border border-white/60 w-[150px] h-[150px]"
                  style={{
                    background: randomColor,
                    animation: `child${face} 3000ms ease-in-out infinite alternate`,
                  }}
                />
              );
            })}
          </ol>
        </div>
      ))}

      {/* Custom animations via inline style */}
      <style>{`
        @keyframes rotate1 {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(1080deg); }
        }
        @keyframes rotate2 {
          0% { transform: rotateX(0deg) rotateY(0deg) scale3d(0.7, 0.7, 0.7); }
          100% { transform: rotateX(360deg) rotateY(1080deg) scale3d(0.7, 0.7, 0.7); }
        }
        @keyframes rotate3 {
          0% { transform: rotateX(0deg) rotateY(0deg) scale3d(0.4, 0.4, 0.4); }
          100% { transform: rotateX(360deg) rotateY(1080deg) scale3d(0.4, 0.4, 0.4); }
        }

        @keyframes child1 {
          0% { transform: translateZ(${diceSize / 2}px); }
          100% { transform: translateZ(-${diceSize / 2}px); }
        }
        @keyframes child2 {
          0% { transform: translateY(${diceSize / 2}px) rotateX(270deg); }
          100% { transform: translateY(-${diceSize / 2}px) rotateX(270deg); }
        }
        @keyframes child3 {
          0% { transform: translateX(${diceSize / 2}px) rotateY(-270deg); }
          100% { transform: translateX(-${diceSize / 2}px) rotateY(-270deg); }
        }
        @keyframes child4 {
          0% { transform: translateX(-${diceSize / 2}px) rotateY(-90deg); }
          100% { transform: translateX(${diceSize / 2}px) rotateY(-90deg); }
        }
        @keyframes child5 {
          0% { transform: translateY(-${diceSize / 2}px) rotateX(90deg); }
          100% { transform: translateY(${diceSize / 2}px) rotateX(90deg); }
        }
        @keyframes child6 {
          0% { transform: translateZ(-${diceSize / 2}px) rotateY(180deg); }
          100% { transform: translateZ(${diceSize / 2}px) rotateY(180deg); }
        }

        .animate-rotate1 {
          animation: rotate1 20000ms linear infinite;
        }
        .animate-rotate2 {
          animation: rotate2 20000ms linear infinite;
        }
        .animate-rotate3 {
          animation: rotate3 20000ms linear infinite;
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default DiceLoader;
