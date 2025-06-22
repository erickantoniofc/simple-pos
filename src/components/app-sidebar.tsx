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
import { ModeToggle } from "./mode-toggle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "@/store/pos/branch-thunk";
import type { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/store/pos/product-thunk";
import { loadCategoriesThunk } from "@/store/pos/category-thunk";
import { loadCustomersThunk } from "@/store/pos/customer-thunk";
import { getAllSales } from "@/services/sale.service";
import { getAllSalesThunk } from "@/store/pos/sale-thunks";


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

    const profile = useSelector((state: RootState) => state.auth.profile);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      if (profile) {
        dispatch(fetchBranches());
        dispatch(fetchProducts());
        dispatch(loadCategoriesThunk());
        dispatch(loadCustomersThunk());
        dispatch(getAllSalesThunk());
      }
    }, [dispatch, profile]);
    const {branches, activeBranch} = useSelector((state: RootState) => state.branches);

  return (
    <Sidebar collapsible="icon">
      
      <SidebarHeader  className="justify-start">
        <ModeToggle />
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
            branches.length > 0 && activeBranch?.id && state === "expanded" && <BranchStepper />
        }
            

          <UserSwitcher/>
      </SidebarFooter>
    
    </Sidebar>
  )
}