import * as React from "react"
import { Link } from "react-router-dom"
import { Copyright } from 'lucide-react'
import { Toaster } from "@/components/ui/toaster"



const Footer = (props) => {
    return (
        <>
            <div className="fixed z-0 bottom-0 w-full h-6 flex justify-end items-start text-sm text-zinc-400 hover:text-zinc-500 rounded-b-lg px-4 py-1 bg-gradient-to-r from-cor-80 to-cor-60">
                <Link to="/about">
                    <span className="text-xs">v.0.20240614&nbsp;&nbsp;<Copyright className="w-2 h-2" /></span>
                </Link>
                <Toaster />
            </div>
        </>
    )
}

export default Footer
