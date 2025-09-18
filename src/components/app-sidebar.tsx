"use client"

import * as React from "react"
import {
  Map,
  PieChart,
  Home,
  UserPlus,
  Users,
  Calendar,
  Folder,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "InfoCar Admin",
    email: "admin@infocar.com",
    avatar: "/infocard_logo.png",
  },
  navMain: [
    {
      title: "Pagina Principal",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Inicio",
          url: "/dashboard",
        },
        {
          title: "Publicaciones",
          url: "/dashboard/publicaciones",
        },
        {
          title: "Eventos",
          url: "/dashboard/eventos",
        },
      ],
    },
    {
      title: "Creador",
      url: "#",
      icon: UserPlus,
      items: [
        {
          title: "Crear un post",
          url: "/editor",
        },
        {
          title: "Editar un post",
          url: "/register",
        },
        {
          title: "Ver Recepcion",
          url: "/forgot-password",
        },
      ],
    },
    {
      title: "Historial",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Me gustas",
          url: "/users",
        },
        {
          title: "Comentarios",
          url: "/comments",
        },

      ],
    },
    {
      title: "Otros",
      url: "#",
      icon: Folder,
      items: [
        {
          title: "Anexos",
          url: "#",
        },
        {
          title: "Programas",
          url: "#",
        },
        {
          title: "Cumpleaños",
          url: "#",
        },
        {
          title: "Mision y Vision",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Usuarios",
      url: "/dashboard/usuarios",
      icon: Users,
      actions: {
        view: true,
        edit: true,
        delete: true,
        add: true
      }
    },
    {
      name: "Estadísticas",
      url: "/dashboard/estadisticas",
      icon: PieChart,
      actions: {
        view: true,
        edit: false,
        delete: false,
        add: false
      }
    },
    {
      name: "Ubicaciones",
      url: "/dashboard/ubicaciones",
      icon: Map,
      actions: {
        view: true,
        edit: true,
        delete: true,
        add: true
      }
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Simular estado de usuario logueado - en una app real esto vendría de un contexto de autenticación
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<string | null>(null)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentUser("Juan Pérez")
  }

  return (
    <Sidebar variant="inset" className="border-r-2 border-gradient-to-b from-teal-200 to-blue-200" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="flex items-center gap-3 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 rounded-lg transition-all duration-200">
                <div className="flex aspect-square size-16 items-center justify-center rounded-lg">
                  <img src="/infocar-logo.svg" alt="InfoCar Logo" className="size-14" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-xl bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    INFOCAR
                  </span>
                  {!isLoggedIn && (
                    <button 
                      onClick={handleLogin}
                      className="text-xs text-green-600 hover:text-green-700 text-left"
                    >
                      Iniciar Sesión
                    </button>
                  )}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-slate-50 to-slate-100">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="bg-gradient-to-r from-teal-50 to-blue-50 border-t border-teal-200">
        <NavUser user={data.user} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  )
}
