"use client"
import React, { useEffect, useState } from 'react';

interface Album {
  id?: number;
  nome: string;
  banda: string;
  capa: string;
  link: string;
  nota?: number;
}

function Random() {
  const [album, setAlbum] = useState<Album>()

  async function getAlbum(){
    const res = await fetch("https://typescript-daily-songs.onrender.com/album/aleatorio");
    const albumsData = await res.json();
    setAlbum(albumsData);
  }

  useEffect(() => {
    getAlbum();
  }, []);

  return ( 
    <div className='flex items-center justify-center max-h-screen overflow-auto h-screen'>
        <div className='flex items-center justify-center'>
            <div className='w-96'>
                <a href={album?.link} target="_blank" rel="noopener noreferrer">
                    <img src={album?.capa} />
                </a>
                <h3 className="truncate text-xl text-white font-bold">{album?.nome}</h3>
                <p className="truncate mt-2 text-sm text-gray-300">{album?.banda}</p>
                
            </div>

        </div>
    </div>
  );
}

export default Random;