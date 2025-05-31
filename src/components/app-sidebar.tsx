import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { CircleUserRound, FileBox, FilePlus, PackageSearch, SquareMousePointer } from "lucide-react"
import { BranchSwitcher } from "./branch-switcher"
import { UserSwitcher } from "./user-switcher"
import { Link } from "react-router-dom"

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      
      <SidebarHeader>
        <BranchSwitcher />
      </SidebarHeader>

      <SidebarContent>

        <SidebarGroup> 
            <SidebarGroupContent>
                <SidebarMenu>
                    
                        <SidebarMenuItem >
                            <SidebarMenuButton tooltip="Punto de ventas" asChild >
                                <Link to="pos">
                                    <SquareMousePointer/>
                                    <span>Punto de ventas</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>


                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Facturacion" asChild>
                                <Link to="facturas">
                                    <FilePlus/>
                                    <span>Documentos</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Productos" asChild>
                                <Link to="productos">
                                    <PackageSearch/>
                                    <span>Productos</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Clientes" asChild>
                                <Link to="clientes">
                                    <CircleUserRound/>
                                    <span>Clientes</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        
                    
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        
      </SidebarContent>

      
      <SidebarFooter>
          <UserSwitcher/>
      </SidebarFooter>
    
    </Sidebar>
  )
}