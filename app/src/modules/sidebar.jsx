import * as React from "react"
import { Link } from "react-router-dom"


import {
    Copyright,
    Boxes,
    Package,
    Package2,
    Home,
    LineChart,
    Puzzle,
    Settings,
    AlignHorizontalDistributeCenter as Piece,
    PackagePlus,
    PackageMinus,
    ArrowRightLeft as Moves,
    ShoppingBasket,
    BaggageClaim,
    FileStack,
    ScrollText
} from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import WareHouse from "@/assets/warehouse"

const Sidebar = (props) => {
    return (
        <>
            <div className="flex min-h-screen w-12 flex-col bg-muted/40 opacity-60">
                <aside className="fixed inset-y-0 left-0 z-100 hidden w-12 flex-col border-r bg-zinc-100 sm:flex">
                    <nav className="flex flex-col items-center gap-4 px-2 py-4">
                        <div className="mt-28">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/items">
                                            <Boxes className="hover:text-lime-500" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-lime-300">Itens de Estoque</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="mt-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/supply">
                                            <PackagePlus className="hover:text-lime-500" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-lime-300">Adicionar Item</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="mt-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/takeout">
                                            <BaggageClaim className="hover:text-lime-500" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-lime-300">Movimentações</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="mt-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/moves">
                                            <ScrollText className="hover:text-lime-500" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-lime-300">Histórico</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </nav>
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                        <div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to="/settings">
                                            <Settings className="hover:text-orange-600" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-orange-400">Configurações</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </nav>
                </aside>
            </div>
        </>
    )
}

export default Sidebar