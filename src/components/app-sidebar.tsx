import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"
import { useSidebar } from "@/components/ui/sidebar";


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
import { CircleUserRound, FilePlus, List, PackageSearch, SquareMousePointer } from "lucide-react"
import { UserSwitcher } from "./user-switcher"
import { BranchStepper } from "./branch-stepper";


export const AppSidebar = () => {
    const { state } = useSidebar();
    const location = useLocation();
    const pathname = location.pathname;
    const menuItems = [
    { to: "/pos", icon: <SquareMousePointer />, label: "Punto de ventas" },
    { to: "/facturas", icon: <FilePlus />, label: "Documentos" },
    { to: "/productos", icon: <PackageSearch />, label: "Productos" },
    { to: "/categorias", icon: <List />, label: "Categorias" },
    { to: "/clientes", icon: <CircleUserRound />, label: "Clientes" },
    ];
  return (
    <Sidebar collapsible="icon">
      
      <SidebarHeader>
      </SidebarHeader>
                <h1 className="text-center text-xl text-primary">L     O     G     O</h1>

      <SidebarContent>

        <SidebarGroup> 
            <SidebarGroupContent>
                <SidebarMenu>
                    
                {menuItems.map(({ to, icon, label }) => (
                    <SidebarMenuItem
                    key={to}
                    className={pathname.startsWith(to) ? "bg-muted text-primary font-semibold rounded-md" : ""}
                    >
                    <SidebarMenuButton tooltip={label} asChild>
                        <Link to={to}>
                        {icon}
                        <span>{label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                    
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        
      </SidebarContent>

      
      <SidebarFooter>
        {
            state === "expanded" && <BranchStepper />
        }
            

          <UserSwitcher/>
      </SidebarFooter>
    
    </Sidebar>
  )
}