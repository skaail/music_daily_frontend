"use client"
import React, { useState } from 'react'
import { HiHome, HiChartBar, HiOutlineSearch, HiAdjustments, HiChevronDoubleLeft } from "react-icons/hi"

const menu_items = [
    {nome: "Home", link: "/", icon: <HiHome />},
    {nome: "Pesquisar", link: "/pesquisar", icon: <HiOutlineSearch />},
    {nome: "Ranking", link: "/ranking", icon: <HiChartBar />},
    {nome: "Música Aleatória", link: "/random", icon: <HiAdjustments />}
]

function SideBar() {
    const [open, setOpen] = useState(false)

    return (
        <aside className={`flex flex-col transition-all ${open ? 'w-24' : 'w-64'}  h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700`}>
            <div className='flex items-center justify-between'>
                <a href="#">
                    <h1 className={`${open ? 'opacity-0' : 'opacity-100'}`}>Daily Songs</h1>
                </a>
                <HiChevronDoubleLeft className='cursor-pointer' onClick={() => setOpen(!open)}/>
            </div>


            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className='flex justify-center flex-col'>
                    {menu_items.map((item, i) => (
                        <a key={i} className={`flex transition-all items-center ${open ? 'justify-center' : ''} py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`} href={item.link}>
                            <div className={`${open ? 'text-5xl' : 'text-sm'}`}>{item.icon}</div>
                            <span className={`transition-all overflow-hidden ${open ? 'w-0' : 'mx-4 font-medium'}`}>{item.nome}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    )
}

export default SideBar