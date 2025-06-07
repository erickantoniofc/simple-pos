import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger, AppSidebar } from "@/components"

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
