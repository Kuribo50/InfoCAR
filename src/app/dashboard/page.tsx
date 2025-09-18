import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/dashboard/carousel"
import { NewsSection } from "@/components/dashboard/news-section"
import { Widgets } from "@/components/dashboard/widgets"
import { Home, MoreHorizontal, Component, Settings, User, HelpCircle } from "lucide-react"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            
            {/* Home Button */}
            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <a href="/dashboard">
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">Inicio</span>
              </a>
            </Button>
            
            <Separator orientation="vertical" className="mx-2 h-4" />
            
            {/* Enhanced Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard" className="flex items-center gap-1">
                    <Home className="h-3 w-3" />
                    Tablero
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inicio</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Right side navigation */}
          <div className="ml-auto flex items-center gap-2 px-4">
            {/* Components Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Component className="h-4 w-4" />
                  <span className="hidden md:inline">Componentes</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Componentes UI</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Component className="mr-2 h-4 w-4" />
                  Carrusel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Component className="mr-2 h-4 w-4" />
                  Noticias
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Component className="mr-2 h-4 w-4" />
                  Widgets
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Component className="mr-2 h-4 w-4" />
                  Sidebar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* More Toggle Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="hidden md:inline">Más</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ayuda
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Carrusel principal */}
          <div className="w-full">
            <Carousel />
          </div>
          
          {/* Contenido principal con noticias y widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sección de noticias - ocupa 2 columnas en pantallas grandes */}
            <div className="lg:col-span-2">
              <NewsSection />
            </div>
            
            {/* Widgets laterales - ocupa 1 columna en pantallas grandes */}
            <div className="lg:col-span-1">
              <Widgets />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
