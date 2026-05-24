import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import Logo from '../components/logo.jsx'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx"
import { Search, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input.jsx"
import { Button } from "@/components/ui/button.jsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx"
import Pagetitle from "@/components/pagetitle.jsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Header = () => {
  const location = useLocation();
  //console.log(location)
  var title = 'Gerenciamento de Estoque';
  if (location) {
    switch (true) {
      case location.pathname === '/':
        title = 'Gerenciamento de Estoque'
        break;
      case location.pathname === '/items':
        title = 'Itens de Estoque'
        break;
      case location.pathname === '/users':
        title = 'Usuários'
        break;
      case location.pathname === '/moves':
        title = 'Histórico'
        break;
      case location.pathname === '/settings':
        title = 'Configurações'
        break;
      case location.pathname === '/brands':
        title = 'Fabricantes'
        break;
      case location.pathname === '/categories':
        title = 'Categorias'
        break;
      case location.pathname === '/units':
        title = 'Unidades de Medida'
        break;
      case location.pathname === '/supply':
        title = 'Adicionar Item de Estoque'
        break;
      case location.pathname === '/takeout':
        title = 'Movimentações'
        break;
      case location.pathname.includes('/brands/'):
        title = 'Detalhes do Fabricante'
        break;
      case location.pathname.includes('/users/'):
        title = 'Detalhes do Usuário'
        break;
      case location.pathname.includes('/components/'):
        title = 'Detalhes do Componente'
        break;
      case location.pathname.includes('/categories/'):
        title = 'Editar Categoria'
        break;
      case location.pathname.includes('/locals/'):
        title = 'Editar Estoque'
        break;
      case location.pathname.includes('/units/'):
        title = 'Editar Unidade'
        break;
      case location.pathname.includes('/items/'):
        title = 'Detalhes do Item'
        break;
      default:
        title = 'Gerenciamento de Estoque'
        break;
    }
  }

  let userName = localStorage.getItem('userName');
  let iniciais = ''
  let userLink = "users/" + localStorage.getItem('userId');
  if(userName){    
    iniciais = userName.split(' ')
    .map(palavra => palavra.charAt(0))
    .join('');
  }

  return (
    <>
      <div className="fixed z-10 w-full h-16 flex grid-cols-2 grid-rows-1 justify-between px-2 py-2 bg-blue-200">

        <div className="relative flex justify-end mt-2">
          <div className="">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link to="/">
                    <img src="src/assets/warehouse_64.png" alt="WH" width={32} height={32} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-lime-300">Página Inicial</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Pagetitle title={title} />
        </div>

        <div className="relative flex justify-end">
          <Logo className="mx-8" />

          <DropdownMenu className="z-0">
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full mt-2 mx-4"
              >
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[url('./assets/user.png')] bg-cover bg-center text-orange-800 font-bold text-xs pt-[26px]">{iniciais}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={userLink}>
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/about">
                  Ajuda
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="logout">
                  Sair
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </>
  )
}

export default Header