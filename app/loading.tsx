import React from 'react';

const Loading: React.FC = () => (
    <div className="w-full h-screen flex items-center justify-center">
        <div className="flex-col gap-8 w-full flex items-center justify-center">
            <div
                className="w-40 h-40 border-8 border-transparent text-blue-400 text-6xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
            >
                <div
                    className="w-28 h-28 border-8 border-transparent text-red-400 text-4xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
            </div>
        </div>
    </div>
);

export default Loading;
