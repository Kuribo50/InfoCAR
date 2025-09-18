"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Pin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type DashboardNewsItem = {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  featured?: boolean
  isPinned?: boolean
  author?: string
  href?: string
}

const categoryStyles: Record<
  string,
  {
    badge: string
    accent: string
    text: string
  }
> = {
  Tecnología: {
    badge: "bg-emerald-100 text-emerald-800",
    accent: "ring-emerald-200/70",
    text: "text-emerald-600",
  },
  Negocios: {
    badge: "bg-blue-100 text-blue-800",
    accent: "ring-blue-200/70",
    text: "text-blue-600",
  },
  Mantenimiento: {
    badge: "bg-amber-100 text-amber-800",
    accent: "ring-amber-200/70",
    text: "text-amber-600",
  },
  Finanzas: {
    badge: "bg-violet-100 text-violet-800",
    accent: "ring-violet-200/70",
    text: "text-violet-600",
  },
}

const newsData: DashboardNewsItem[] = [
  {
    id: 1,
    title: "Nueva actualización del sistema InfoCar",
    excerpt:
      "Descubre las últimas funcionalidades implementadas para mejorar la gestión vehicular de tu empresa.",
    category: "Tecnología",
    date: "2024-01-15",
    image: "/news-1.svg",
    featured: true,
    isPinned: true,
    author: "Equipo InfoCar",
    href: "/dashboard/noticias/actualizacion",
  },
  {
    id: 2,
    title: "Mejores prácticas en gestión de flotas",
    excerpt: "Consejos y estrategias para optimizar el rendimiento de tu flota vehicular.",
    category: "Negocios",
    date: "2024-01-14",
    image: "/news-2.svg",
    href: "/dashboard/noticias/gestion-flotas",
  },
  {
    id: 3,
    title: "Mantenimiento preventivo: clave del éxito",
    excerpt:
      "La importancia del mantenimiento regular para prolongar la vida útil de los vehículos.",
    category: "Mantenimiento",
    date: "2024-01-13",
    image: "/news-1.svg",
    href: "/dashboard/noticias/mantenimiento",
  },
  {
    id: 4,
    title: "Análisis de costos operativos",
    excerpt: "Cómo reducir gastos y maximizar la eficiencia en la operación vehicular.",
    category: "Finanzas",
    date: "2024-01-12",
    image: "/news-2.svg",
    href: "/dashboard/noticias/costos",
  },
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function getCategoryBadge(category: string) {
  return categoryStyles[category]?.badge ?? "bg-slate-100 text-slate-700"
}

function getAccentRing(category: string) {
  return categoryStyles[category]?.accent ?? "ring-slate-200/70"
}

function getAccentText(category: string) {
  return categoryStyles[category]?.text ?? "text-slate-600"
}

export function NewsSection() {
  const featuredNews = newsData.filter((item) => item.featured)
  const regularNews = newsData.filter((item) => !item.featured)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Noticias</h2>
          <p className="text-sm text-muted-foreground">
            Mantente al tanto de los cambios más relevantes dentro de la plataforma.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/noticias">Ver todas</Link>
        </Button>
      </div>

      {/* Noticias Destacadas */}
      {featuredNews.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-muted-foreground">Destacadas</h3>
            <span className="text-xs text-muted-foreground">
              Actualizadas cada semana
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredNews.map((news) => (
              <Card
                key={news.id}
                className={cn(
                  "overflow-hidden border border-border/60",
                  news.isPinned && `${getAccentRing(news.category)} ring-2`
                )}
              >
                <div className="relative aspect-video">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <Badge
                    className={cn(
                      "absolute left-3 top-3",
                      "px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm",
                      getCategoryBadge(news.category)
                    )}
                  >
                    {news.category}
                  </Badge>
                  {news.isPinned && (
                    <div className="absolute right-3 top-3 rounded-full bg-primary px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground shadow-md">
                      <span className="inline-flex items-center gap-1">
                        <Pin className="h-3 w-3" /> Anclada
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="space-y-3 p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-semibold leading-tight text-foreground">
                        {news.title}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{news.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <div className="flex flex-col gap-0.5">
                      <span>{formatDate(news.date)}</span>
                      {news.author && (
                        <span className={cn("font-medium", getAccentText(news.category))}>
                          Por: {news.author}
                        </span>
                      )}
                    </div>
                    <Button asChild variant="ghost" size="sm" className="h-8 px-3 text-xs">
                      <Link href={news.href ?? "#"} aria-label={`Leer más sobre ${news.title}`}>
                        Leer más
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Noticias Recientes */}
      {regularNews.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">Recientes</h3>
          <div className="space-y-3">
            {regularNews.map((news) => (
              <Card
                key={news.id}
                className={cn(
                  "flex flex-col gap-3 rounded-xl border border-border/60 p-4 transition-colors hover:bg-muted/60",
                  news.isPinned && `${getAccentRing(news.category)} ring-1`
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="relative hidden h-16 w-20 overflow-hidden rounded-lg bg-muted sm:block">
                    <Image
                      src={news.image}
                      alt="Ilustración de la noticia"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge
                        variant="outline"
                        className={cn(
                          "border px-2 py-0.5 font-medium uppercase tracking-wide",
                          getCategoryBadge(news.category)
                        )}
                      >
                        {news.category}
                      </Badge>
                      <span className="text-muted-foreground">{formatDate(news.date)}</span>
                      {news.author && (
                        <span className={cn("font-medium", getAccentText(news.category))}>
                          {news.author}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold leading-tight text-foreground">
                      {news.title}
                    </h4>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{news.excerpt}</p>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8 shrink-0"
                  >
                    <Link href={news.href ?? "#"} aria-label={`Ir a ${news.title}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
