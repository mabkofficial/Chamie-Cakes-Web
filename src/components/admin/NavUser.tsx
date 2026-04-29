"use client"

import {
  CreditCard,
  MoreVertical,
  LogOut,
  Bell,
  UserCircle,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-10 px-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              <Avatar className="h-7 w-7 rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-[10px] bg-slate-200">AD</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs ml-2">
                <span className="truncate font-semibold text-black">{user.name}</span>
                <span className="text-slate-500 truncate text-[10px]">
                  Administrator
                </span>
              </div>
              <MoreVertical className="ml-auto size-3.5 text-slate-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-md shadow-lg border-slate-200 bg-white"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-black">{user.name}</span>
                <span className="text-[11px] text-slate-500">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-sm cursor-pointer py-2">
                <UserCircle className="mr-2 h-4 w-4 text-slate-500" />
                <span className="text-sm">Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-sm cursor-pointer py-2">
                <Bell className="mr-2 h-4 w-4 text-slate-500" />
                <span className="text-sm">Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-sm text-red-600 cursor-pointer py-2">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="text-sm">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
