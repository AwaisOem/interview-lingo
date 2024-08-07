'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const VideoPlayer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='flex justify-center items-center w-full flex-col my-20 gap-20 px-4'>
        <h2 className='text-3xl md:text-5xl font-bold text-center'>Experience Our Demo</h2>
        {isClient && (
          <div className='relative w-full max-w-4xl h-0 video-container' style={{ paddingTop: '30%' }}>
            <div className='absolute top-0 left-0 w-full h-full'>
              <ReactPlayer url="/video.mp4" controls width='100%' height='100%' />
            </div>
          </div>
        )}
    </div>
  );
};

export default VideoPlayer;