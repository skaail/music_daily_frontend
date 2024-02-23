import React from 'react'

interface Album {
    nome: string
    banda: string
    capa: string
    nota?: number
}

function AlbumCard(props: Album) {


    return (
        <div className="relative w-48">
            <img src={props.capa} />
            <div className="absolute flex items-center justify-center top-0 right-0 w-10 h-10 bg-gray-800 opacity-70">
                <h3 className="text-xl text-white font-bold">{props.nota}</h3>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                <h3 className="truncate  text-xl text-white font-bold">{props.nome}</h3>
                <p className="truncate mt-2 text-sm text-gray-300">{props.banda}</p>
            </div>
        </div>
    )
    }

export default AlbumCard