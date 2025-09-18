"use client";

import React from "react";
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
  Clock,
  Activity,
  AlertCircle,
  CheckCircle2,
  Check,
  Plus,
  Search,
  Settings,
  BarChart3
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

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

const stats: StatItem[] = [
  { label: "Pacientes Atendidos", value: "1,247", change: "+12%", trend: "up" },
  { label: "Consultas Pendientes", value: "23", change: "-5%", trend: "down" },
  { label: "Documentos Procesados", value: "89", change: "+8%", trend: "up" },
  { label: "Satisfacción Usuario", value: "94%", change: "+2%", trend: "up" },
];

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

const tasks: TaskItem[] = [
  {
    id: 1,
    title: "Revisar informes mensuales",
    priority: "alta",
    dueDate: "2024-01-16",
    completed: false,
  },
  {
    id: 2,
    title: "Actualizar base de datos",
    priority: "media",
    dueDate: "2024-01-18",
    completed: false,
  },
  {
    id: 3,
    title: "Capacitación equipo",
    priority: "baja",
    dueDate: "2024-01-20",
    completed: true,
  },
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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "alta": return "text-red-600 bg-red-50";
    case "media": return "text-yellow-600 bg-yellow-50";
    case "baja": return "text-green-600 bg-green-50";
    default: return "text-gray-600 bg-gray-50";
  }
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
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
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
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}