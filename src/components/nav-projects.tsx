"use client"

import {
  Eye,
  Edit,
  Trash2,
  Plus,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"

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

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
    actions?: {
      view?: boolean
      edit?: boolean
      delete?: boolean
      add?: boolean
    }
  }[]
}) {
  const { isMobile } = useSidebar()

  const handleAction = (action: string, itemName: string) => {
    console.log(`${action} action for ${itemName}`)
    // Aquí se pueden agregar las funciones específicas para cada acción
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Administración</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">Más opciones</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                {item.actions?.view !== false && (
                  <DropdownMenuItem onClick={() => handleAction('Ver', item.name)}>
                    <Eye className="text-muted-foreground" />
                    <span>Ver</span>
                  </DropdownMenuItem>
                )}
                {item.actions?.edit !== false && (
                  <DropdownMenuItem onClick={() => handleAction('Editar', item.name)}>
                    <Edit className="text-muted-foreground" />
                    <span>Editar</span>
                  </DropdownMenuItem>
                )}
                {item.actions?.add !== false && (
                  <DropdownMenuItem onClick={() => handleAction('Agregar', item.name)}>
                    <Plus className="text-muted-foreground" />
                    <span>Agregar</span>
                  </DropdownMenuItem>
                )}
                {(item.actions?.delete !== false) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleAction('Eliminar', item.name)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="text-destructive" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
