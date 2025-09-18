"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Bell,
  AlertCircle,
  CheckCircle2,
  Check,
  Plus,
  Search,
  Settings,
} from "lucide-react";

interface TaskItem {
  id: number;
  title: string;
  priority: "alta" | "media" | "baja";
  dueDate: string;
  completed: boolean;
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "success";
}

const todayStats = [
  { icon: Users, value: "156", label: "Usuarios Activos", color: "text-blue-600" },
  { icon: FileText, value: "89", label: "Documentos", color: "text-green-600" },
  { icon: Calendar, value: "12", label: "Citas Hoy", color: "text-purple-600" },
  { icon: TrendingUp, value: "94%", label: "Rendimiento", color: "text-orange-600" },
];

const quickActions = [
  { icon: Plus, label: "Nuevo Paciente", color: "bg-blue-600" },
  { icon: Search, label: "Buscar", color: "bg-green-600" },
  { icon: Calendar, label: "Agendar Cita", color: "bg-purple-600" },
  { icon: Settings, label: "Configurar", color: "bg-gray-600" },
];

const pendingTasks = [
  {
    id: 1,
    title: "Revisar informes mensuales",
    priority: "alta" as const,
    dueDate: "2024-01-16",
    completed: false,
  },
  {
    id: 2,
    title: "Actualizar base de datos",
    priority: "media" as const,
    dueDate: "2024-01-18",
    completed: false,
  },
];

const monthlyProgress = [
  { label: "Objetivos Mensuales", value: 75 },
  { label: "Satisfacción Cliente", value: 88 },
  { label: "Eficiencia Operativa", value: 92 },
];

const notifications: NotificationItem[] = [
  {
    id: 1,
    title: "Sistema actualizado",
    message: "Nueva versión disponible",
    time: "hace 2 horas",
    type: "success",
  },
  {
    id: 2,
    title: "Mantenimiento programado",
    message: "El sistema estará en mantenimiento mañana",
    time: "hace 4 horas",
    type: "warning",
  },
  {
    id: 3,
    title: "Nuevo mensaje",
    message: "Tienes 3 mensajes sin leer",
    time: "hace 1 día",
    type: "info",
  },
];

type PriorityStyle = { badge: string; label: string }

const priorityStyles: Record<TaskItem["priority"], PriorityStyle> = {
  alta: { badge: "border-red-200 bg-red-50 text-red-700", label: "Alta" },
  media: { badge: "border-amber-200 bg-amber-50 text-amber-700", label: "Media" },
  baja: { badge: "border-emerald-200 bg-emerald-50 text-emerald-700", label: "Baja" },
};

const fallbackPriorityStyle: PriorityStyle = {
  badge: "border-slate-200 bg-slate-50 text-slate-600",
  label: "Sin prioridad",
};

const getPriorityColor = (priority: TaskItem["priority"]): PriorityStyle =>
  priorityStyles[priority] ?? fallbackPriorityStyle;

const formatDueDate = (date: string) => {
  const parsed = new Date(date);
  return parsed.toLocaleDateString("es-ES", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case "warning": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    case "info": return <Bell className="h-4 w-4 text-blue-600" />;
    default: return <Bell className="h-4 w-4 text-gray-600" />;
  }
};

export function Widgets() {
  return (
    <div className="space-y-6">
      {/* Estadísticas del Día */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estadísticas de Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {todayStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Acciones Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                >
                  <div className={`p-2 rounded-full ${action.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tareas Pendientes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tareas Pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTasks.map((task) => {
              const priority = getPriorityColor(task.priority);

              return (
                <div key={task.id} className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">Entrega: {formatDueDate(task.dueDate)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`border text-xs capitalize ${priority.badge}`}>
                      {priority.label}
                    </Badge>
                    <Button variant="ghost" size="sm" aria-label="Marcar tarea como completada">
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Progreso Mensual */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progreso Mensual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyProgress.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-3 rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
              >
                {getNotificationIcon(notification.type)}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}