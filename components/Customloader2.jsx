import React from 'react';

const BounceLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center font-[Montserrat]">
      <div className="flex items-end space-x-2">
        <div className="relative h-[37px] w-[15px]">
          <div className="absolute top-0 w-[15px] h-[15px] bg-[#fbae17] rounded-full animate-bounce-ball origin-center" />
        </div>
        <div className="text-[#fbae17] text-base tracking-wide">LOADING</div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes bounce-ball {
          0% {
            top: 30px;
            height: 5px;
            border-radius: 60px 60px 20px 20px;
            transform: scaleX(2);
          }
          35% {
            height: 15px;
            border-radius: 50%;
            transform: scaleX(1);
          }
          100% {
            top: 0;
          }
        }

        .animate-bounce-ball {
          animation: bounce-ball 500ms alternate infinite ease;
        }
      `}</style>
    </div>
  );
};

export default BounceLoader;
