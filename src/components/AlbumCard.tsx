"use client"
import Link from 'next/link'
import React, { useState } from 'react'


interface Album {
    nome: string
    banda: string
    capa: string
    link: string
    nota?: number
}

function AlbumCard(props: Album) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative w-48 cursor-pointer overflow-hidden" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <a href={props.link}>
            <img src={props.capa} />

            {
                (props.nota) &&             
                <div className="absolute flex items-center justify-center top-0 right-0 w-10 h-10 bg-gray-800 opacity-70">
                    <h3 className="text-xl text-white font-bold">{props.nota}</h3>
                </div>
            }

            <div className={`absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70`}
                style={ open
                    ? { maxHeight: "10rem", transition: "max-height 0.3s linear"}
                    : { maxHeight: "3rem",  transition: "max-height 0.3s ease-out"}
                }
            >
                <h3 className="truncate text-xl text-white font-bold">{props.nome}</h3>
                <p className="truncate mt-2 text-sm text-gray-300">{props.banda}</p>
            </div>
            </a>
            
        </div>
    )
    }

export default AlbumCard