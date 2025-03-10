// import React from 'react';

// const Loading: React.FC = () => (
//     <div className="w-full h-screen flex items-center justify-center">
//         <div className="flex-col gap-8 w-full flex items-center justify-center">
//             <div
//                 className="w-40 h-40 border-8 border-transparent text-blue-400 text-6xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
//             >
//                 <div
//                     className="w-28 h-28 border-8 border-transparent text-red-400 text-4xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
//                 ></div>
//             </div>
//         </div>
//     </div>
// );

// export default Loading;

import React from 'react';

const Loading: React.FC = () => (
    <div className="h-screen flex items-center justify-center">
    <div className="relative flex items-center justify-center">
      {/* Outer Ring */}
      <div className="absolute w-60 h-60 border-8 border-transparent rounded-full animate-[rotate1_2s_linear_infinite] border-b-pink-500"></div>

      {/* Inner Rings */}
      <div className="absolute w-60 h-60 border-8 border-transparent rounded-full animate-[rotate2_2s_linear_infinite] border-b-red-500"></div>
      <div className="absolute w-60 h-60 border-8 border-transparent rounded-full animate-[rotate3_2s_linear_infinite] border-b-cyan-500"></div>
      <div className="absolute w-60 h-60 border-8 border-transparent rounded-full animate-[rotate4_2s_linear_infinite] border-b-yellow-500"></div>

      {/* Loading Text */}
      <div className="absolute text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-teal-500 animate-pulse whitespace-nowrap flex items-center justify-center w-72">
        กำลังโหลด...
      </div>
    </div>
  </div>

);

export default Loading;

