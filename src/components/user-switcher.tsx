import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { ChevronUp, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/store"
import { logout } from "@/store/auth/auth-slice"

export const UserSwitcher = () => {

  const dispatch = useDispatch<AppDispatch>();
  
  const onLogoutHandler = () => {
    dispatch(logout());
  }

  return (
    <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="cursor-pointer">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> 
                    Usuario Test
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
                >
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Cuenta</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Configuracion</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive cursor-pointer" onClick={onLogoutHandler}>
                    <LogOut />
                    <span>Cerrar sesion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
  )
}
