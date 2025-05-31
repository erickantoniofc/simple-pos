import { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown, House } from "lucide-react";
import { mockBranches } from '@/mocks/branches';


export const BranchSwitcher = () => {
  //TODO: Take branches from global store  
  const [selectedBranch, setselectedBranch] = useState(mockBranches[0].name);

  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <House className="size-4" />
                        </div>
                         <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-semibold">Sucursal</span>
                            <span className="">{selectedBranch}</span>
                        </div>
                        <ChevronsUpDown className="ml-auto" />

                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
                align="start"
                side="right"
                >
                    {mockBranches.map((branch) => (
                    <DropdownMenuItem
                        key={branch.id}
                        onSelect={() => setselectedBranch(branch.name)}
                    >
                        
                        {branch.name}{" "}
                        {branch.name === selectedBranch && <Check className="ml-auto" />}
                    </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
  );

};