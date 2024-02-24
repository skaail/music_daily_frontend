"use client"
import React, { useState } from 'react'

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"

import axios from "axios"
import { ReloadIcon } from '@radix-ui/react-icons'

interface Album {
    id?: number
    nome: string
    banda: string
    capa: string
    link: string
    update?: () => void
    nota?: number

}

function AlbumCard(props: Album) {
    const [open, setOpen] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [nota, setNota] = useState()

    const [saving, setSaving] = useState(false)

    async function deleteAlbum(id?: number){
        
        let headersList = {
            'Content-Type': 'application/json',
          }
      
          let reqOptions = {
            url: "https://typescript-daily-songs.onrender.com/album/"+ id,
            method: "DELETE",
            headers: headersList,
          }
      
          let response = await axios.request(reqOptions)

          if(props.update) {
            props.update()
        }
    }


    async function darNota(id?: number, nota?: number) {

        setSaving(true)

        let headersList = {
          'Content-Type': 'application/json',
        }
    
        let bodyContent = JSON.stringify({
          "nota": nota
        })
    
        let reqOptions = {
          url: "https://typescript-daily-songs.onrender.com/album/"+ id,
          method: "PUT",
          headers: headersList,
          data: bodyContent,
        }
    
        let response = await axios.request(reqOptions)

        if(props.update) {
            props.update()
        }
        setSaving(false)
        setDialog(!dialog)
        
      }

      const handleChange = (event: any) => {

        setNota(event.target.value)
      }

    return (
        <div className="relative w-48 cursor-pointer overflow-hidden" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <ContextMenu>
                <ContextMenuTrigger>
                <a href={props.link} target="_blank" rel="noopener noreferrer">
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
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem>Atualizar</ContextMenuItem>
                    <ContextMenuItem onClick={() => deleteAlbum(props.id)}>Apagar</ContextMenuItem>
                    {
                        (!props.nota) &&             
                        <ContextMenuItem onClick={() => setDialog(!dialog)}>Dar Nota</ContextMenuItem>
                    }
                </ContextMenuContent>
            </ContextMenu>

            <AlertDialog open={dialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Dar Nota Para {props.nome}</AlertDialogTitle>
                        <AlertDialogDescription>
                        <Input onChange={handleChange} id="nome" type="number" placeholder="0 - 10" max={10} min={0}/>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialog(!dialog)}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction disabled={saving} onClick={() => darNota(props.id, nota)}>
                            {
                                (saving) &&
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Dar Nota
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
    }

export default AlbumCard