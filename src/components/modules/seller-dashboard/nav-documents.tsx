"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconDots,
  IconExternalLink,
  IconPlus,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    url: string
    icon: Icon
  }[]
}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.url}
              className="data-[active=true]:bg-emerald-50 data-[active=true]:text-emerald-600"
            >

              <Link href={item.url}>
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="data-[state=open]:bg-accent rounded-sm"
                >
                  <IconDots size={16} />
                  <span className="sr-only">Actions</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-40 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <IconExternalLink size={16} className="mr-2" />
                  <span>View Details</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <IconTrash size={16} className="mr-2" />
                  <span>Archive</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
          <SidebarMenuButton className="text-emerald-600 hover:text-emerald-700 font-medium">
            <IconPlus size={18} />
            <span>Add New Medicine</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}