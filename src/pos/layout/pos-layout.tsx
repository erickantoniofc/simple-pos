import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"

export const PosLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full ">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
