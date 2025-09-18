"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Eye, Pin } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  publishDate: string;
  readTime: string;
  views: number;
  image?: string;
  featured?: boolean;
  isPinned?: boolean;
  author?: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Nuevas Directrices de Salud Digital para 2024",
    summary: "El Ministerio de Salud presenta las nuevas normativas para la digitalización de procesos sanitarios en centros de atención primaria.",
    category: "Normativas",
    publishDate: "2024-01-15",
    readTime: "5 min",
    views: 1250,
    image: "https://placehold.co/400x200/3b82f6/ffffff?text=Salud+Digital",
    featured: true,
    isPinned: true,
    author: "Ministerio de Salud",
  },
  {
    id: 2,
    title: "Actualización del Sistema de Registro de Pacientes",
    summary: "Mejoras en la interfaz y nuevas funcionalidades para optimizar el registro y seguimiento de pacientes.",
    category: "Tecnología",
    publishDate: "2024-01-12",
    readTime: "3 min",
    views: 890,
    image: "https://placehold.co/400x200/10b981/ffffff?text=Sistema",
    author: "Equipo de Desarrollo",
  },
  {
    id: 3,
    title: "Capacitación en Nuevos Protocolos de Atención",
    summary: "Programa de formación continua para el personal de salud en los nuevos protocolos de atención al paciente.",
    category: "Capacitación",
    publishDate: "2024-01-10",
    readTime: "4 min",
    views: 675,
    isPinned: true,
    author: "Departamento de Capacitación",
  },
  {
    id: 4,
    title: "Estadísticas de Atención Primer Trimestre",
    summary: "Análisis detallado de los indicadores de atención y satisfacción del usuario durante el primer trimestre del año.",
    category: "Estadísticas",
    publishDate: "2024-01-08",
    readTime: "6 min",
    views: 432,
    author: "Analista de Datos",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    "Normativas": "bg-blue-100 text-blue-800",
    "Tecnología": "bg-green-100 text-green-800",
    "Capacitación": "bg-purple-100 text-purple-800",
    "Estadísticas": "bg-orange-100 text-orange-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
}

export function NewsSection() {
  const featuredNews = [
    {
      id: 1,
      title: "Nueva Actualización del Sistema InfoCar",
      excerpt: "Descubre las últimas funcionalidades implementadas para mejorar la gestión vehicular de tu empresa.",
      category: "Tecnología",
      date: "2024-01-15",
      image: "/news-1.svg",
    },
  ];

  const regularNews = [
    {
      id: 2,
      title: "Mejores Prácticas en Gestión de Flotas",
      excerpt: "Consejos y estrategias para optimizar el rendimiento de tu flota vehicular.",
      category: "Negocios",
      date: "2024-01-14",
      image: "/news-2.svg",
    },
    {
      id: 3,
      title: "Mantenimiento Preventivo: Clave del Éxito",
      excerpt: "La importancia del mantenimiento regular para prolongar la vida útil de los vehículos.",
      category: "Mantenimiento",
      date: "2024-01-13",
      image: "/news-1.svg",
    },
    {
      id: 4,
      title: "Análisis de Costos Operativos",
      excerpt: "Cómo reducir gastos y maximizar la eficiencia en la operación vehicular.",
      category: "Finanzas",
      date: "2024-01-12",
      image: "/news-2.svg",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Noticias</h2>
        <Button variant="outline" size="sm">
          Ver Todas
        </Button>
      </div>

      {/* Noticias Destacadas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Destacadas</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredNews.map((news) => (
            <Card key={news.id} className={`overflow-hidden ${news.isPinned ? 'ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
              <div className="aspect-video relative">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
              e.currentTarget.src = "/news-1.svg";
            }}
                />
                <Badge 
                  className="absolute top-2 left-2"
                  style={{ backgroundColor: getCategoryColor(news.category) }}
                >
                  {news.category}
                </Badge>
                {news.isPinned && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white p-1.5 rounded-full shadow-lg">
                    <Pin className="h-3 w-3" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold line-clamp-2 flex-1">{news.title}</h4>
                    {news.isPinned && (
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        Anclada
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex flex-col gap-1">
                      <span>{formatDate(news.date)}</span>
                      {news.author && (
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          Por: {news.author}
                        </span>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      Leer Más
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Noticias Regulares */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Recientes</h3>
        <div className="space-y-3">
          {regularNews.map((news) => (
            <Card key={news.id} className={`p-4 ${news.isPinned ? 'ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge 
                      variant="outline"
                      style={{ borderColor: getCategoryColor(news.category) }}
                    >
                      {news.category}
                    </Badge>
                    {news.isPinned && (
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        <Pin className="h-3 w-3 mr-1" />
                        Anclada
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatDate(news.date)}
                    </span>
                  </div>
                  <h4 className="font-medium line-clamp-1">{news.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {news.excerpt}
                  </p>
                  {news.author && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Por: {news.author}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}