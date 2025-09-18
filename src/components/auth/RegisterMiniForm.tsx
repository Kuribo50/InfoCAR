"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatRut, validateRut } from "@/lib/rut";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Props = {
  onBackToLogin?: () => void;
};

// Tipos para los catálogos
type CatalogoItem = {
  id: string;
  nombre: string;
};

export default function RegisterMiniForm({ onBackToLogin }: Props) {
  // Estado para los catálogos (simulados, en producción vendrían de la API)
  const [catalogos] = useState<{
    generos: CatalogoItem[];
    cargos: CatalogoItem[];
    funciones: CatalogoItem[];
    establecimientos: CatalogoItem[];
    sectores: CatalogoItem[];
    roles: CatalogoItem[];
    estadosUsuario: CatalogoItem[];
  }>({
    generos: [
      { id: "masculino", nombre: "Masculino" },
      { id: "femenino", nombre: "Femenino" },
      { id: "otro", nombre: "Otro" },
      { id: "no-especifica", nombre: "Prefiero no especificar" }
    ],
    cargos: [
      { id: "administrativo", nombre: "Administrativo" },
      { id: "enfermero", nombre: "Enfermero/a" },
      { id: "tens", nombre: "TENS" },
      { id: "informatico", nombre: "Informático" },
      { id: "medico", nombre: "Médico" },
      { id: "auxiliar", nombre: "Auxiliar" }
    ],
    funciones: [
      { id: "jefa-salud-familiar", nombre: "Jefa Salud Familiar" },
      { id: "coordinador-sar", nombre: "Coordinador SAR" },
      { id: "director", nombre: "Director" },
      { id: "subdirector", nombre: "Subdirector" }
    ],
    establecimientos: [
      { id: "cesfam-1", nombre: "CESFAM Principal" },
      { id: "cecosf-1", nombre: "CECOSF Norte" },
      { id: "sar-1", nombre: "SAR Central" }
    ],
    sectores: [
      { id: "sector-azul", nombre: "Sector Azul" },
      { id: "sector-verde", nombre: "Sector Verde" },
      { id: "sector-rojo", nombre: "Sector Rojo" }
    ],
    roles: [
      { id: "lector", nombre: "Lector" },
      { id: "editor", nombre: "Editor" },
      { id: "administrador", nombre: "Administrador" }
    ],
    estadosUsuario: [
      { id: "activo", nombre: "Activo" },
      { id: "inactivo", nombre: "Inactivo" },
      { id: "suspendido", nombre: "Suspendido" }
    ]
  });

  // Estado completo del formulario según el modelo Usuario
  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    segundoApellido: "",
    correo: "",
    password: "",
    confirmPassword: "",
    fechaNacimiento: "",
    generoId: "",
    cargoId: "",
    funcionId: "",
    establecimientoId: "",
    sectorId: "",
    rolId: "",
    estadoUsuarioId: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<'personal' | 'profesional' | 'cuenta'>('personal');

  // Manejadores de cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error al cambiar el valor
    if (errors[name as keyof typeof form]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setForm(prev => ({ ...prev, rut: formatted }));
    
    // Validación temprana del RUT
    if (formatted.length >= 11 && !validateRut(formatted)) {
      setErrors(prev => ({ ...prev, rut: "RUT inválido" }));
    } else {
      setErrors(prev => ({ ...prev, rut: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error al cambiar el valor
    if (errors[name as keyof typeof form]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Validación de campos vacíos por sección
  const validateSection = (section: 'personal' | 'profesional' | 'cuenta'): boolean => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};
    
    if (section === 'personal') {
      if (!form.rut) newErrors.rut = "El RUT es requerido";
      else if (!validateRut(form.rut)) newErrors.rut = "RUT inválido";
      
      if (!form.nombre) newErrors.nombre = "El nombre es requerido";
      if (!form.apellido) newErrors.apellido = "El apellido es requerido";
      if (!form.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
      if (!form.generoId) newErrors.generoId = "El género es requerido";
    }
    
    if (section === 'profesional') {
      if (!form.cargoId) newErrors.cargoId = "El cargo es requerido";
      if (!form.funcionId) newErrors.funcionId = "La función es requerida";
      if (!form.establecimientoId) newErrors.establecimientoId = "El establecimiento es requerido";
      if (!form.sectorId) newErrors.sectorId = "El sector es requerido";
    }
    
    if (section === 'cuenta') {
      if (!form.correo) newErrors.correo = "El correo es requerido";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) newErrors.correo = "Correo electrónico inválido";
      
      if (!form.password) newErrors.password = "La contraseña es requerida";
      else if (form.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      
      if (!form.confirmPassword) newErrors.confirmPassword = "Confirma tu contraseña";
      else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
      
      if (!form.rolId) newErrors.rolId = "El rol es requerido";
      if (!form.estadoUsuarioId) newErrors.estadoUsuarioId = "El estado es requerido";
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Manejador para cambiar de sección
  const handleSectionChange = (nextSection: 'personal' | 'profesional' | 'cuenta') => {
    // Si estamos avanzando, validamos la sección actual
    if (
      (activeSection === 'personal' && nextSection === 'profesional') ||
      (activeSection === 'profesional' && nextSection === 'cuenta')
    ) {
      if (!validateSection(activeSection)) return;
    }
    
    setActiveSection(nextSection);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar la sección actual antes de enviar
    if (!validateSection('cuenta')) return;
    
    try {
      setIsLoading(true);
      // Aquí iría la lógica real de registro (fetch a tu API)
      await new Promise(r => setTimeout(r, 800));
      console.log("Registro:", form);
      // Redirigir o mostrar mensaje de éxito
      if (onBackToLogin) onBackToLogin();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizado de la sección personal
  const renderPersonalSection = () => (
    <motion.div
      key="personal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Información Personal</CardTitle>
          <CardDescription>Ingresa tus datos personales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* RUT y Fecha de Nacimiento en la misma fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="rut" className="text-sm font-medium">RUT</Label>
              <Input
                id="rut"
                name="rut"
                type="text"
                placeholder="12.345.678-9"
                value={form.rut}
                onChange={handleRutChange}
                className="h-10 rounded-lg"
                required
              />
              <span className="error-message">{errors.rut || " "}</span>
            </div>

            <div className="form-field">
              <Label htmlFor="fechaNacimiento" className="text-sm font-medium">Fecha de Nacimiento</Label>
              <Input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={form.fechaNacimiento}
                onChange={handleChange}
                className="h-10 rounded-lg"
                required
              />
              <span className="error-message">{errors.fechaNacimiento || " "}</span>
            </div>
          </div>

          {/* Nombre, Apellido y Segundo Apellido en la misma fila */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-field">
              <Label htmlFor="nombre" className="text-sm font-medium">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                className="h-10 rounded-lg"
                required
              />
              <span className="error-message">{errors.nombre || " "}</span>
            </div>

            <div className="form-field">
              <Label htmlFor="apellido" className="text-sm font-medium">Apellido</Label>
              <Input
                id="apellido"
                name="apellido"
                type="text"
                placeholder="Apellido"
                value={form.apellido}
                onChange={handleChange}
                className="h-10 rounded-lg"
                required
              />
              <span className="error-message">{errors.apellido || " "}</span>
            </div>

            <div className="form-field">
              <Label htmlFor="segundoApellido" className="text-sm font-medium">Segundo Apellido</Label>
              <Input
                id="segundoApellido"
                name="segundoApellido"
                type="text"
                placeholder="Segundo Apellido (opcional)"
                value={form.segundoApellido}
                onChange={handleChange}
                className="h-10 rounded-lg"
              />
              <span className="error-message">{errors.segundoApellido || " "}</span>
            </div>
          </div>

          {/* Género en su propia fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="generoId" className="text-sm font-medium">Género</Label>
              <Select 
                value={form.generoId} 
                onValueChange={(value) => handleSelectChange("generoId", value)}
              >
                <SelectTrigger id="generoId" className="h-10 rounded-lg">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {catalogos.generos.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="error-message">{errors.generoId || " "}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          onClick={() => handleSectionChange('profesional')}
          className="rounded-lg"
        >
          Siguiente
        </Button>
      </div>
    </motion.div>
  );

  // Renderizado de la sección profesional
  const renderProfesionalSection = () => (
    <motion.div
      key="profesional"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Información Profesional</CardTitle>
          <CardDescription>Ingresa tus datos laborales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cargo y Función en la misma fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="cargoId" className="text-sm font-medium">Cargo</Label>
              <Select 
                value={form.cargoId} 
                onValueChange={(value) => handleSelectChange("cargoId", value)}
              >
                <SelectTrigger id="cargoId" className="h-10 rounded-lg">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {catalogos.cargos.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="error-message">{errors.cargoId || " "}</span>
            </div>

            <div className="form-field">
              <Label htmlFor="funcionId" className="text-sm font-medium">Función</Label>
              <Select 
                value={form.funcionId} 
                onValueChange={(value) => handleSelectChange("funcionId", value)}
              >
                <SelectTrigger id="funcionId" className="h-10 rounded-lg">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {catalogos.funciones.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="error-message">{errors.funcionId || " "}</span>
            </div>
          </div>

          {/* Establecimiento y Sector en la misma fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="establecimientoId" className="text-sm font-medium">Establecimiento</Label>
              <Select 
                value={form.establecimientoId} 
                onValueChange={(value) => handleSelectChange("establecimientoId", value)}
              >
                <SelectTrigger id="establecimientoId" className="h-10 rounded-lg">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {catalogos.establecimientos.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="error-message">{errors.establecimientoId || " "}</span>
            </div>

            <div className="form-field">
              <Label htmlFor="sectorId" className="text-sm font-medium">Sector</Label>
              <Select 
                value={form.sectorId} 
                onValueChange={(value) => handleSelectChange("sectorId", value)}
              >
                <SelectTrigger id="sectorId" className="h-10 rounded-lg">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {catalogos.sectores.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="error-message">{errors.sectorId || " "}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSectionChange('personal')}
          className="rounded-lg"
        >
          Anterior
        </Button>
        <Button 
          type="button" 
          onClick={() => handleSectionChange('cuenta')}
          className="rounded-lg"
        >
          Siguiente
        </Button>
      </div>
    </motion.div>
  );

  // Renderizado de la sección de cuenta
  const renderCuentaSection = () => (
    <motion.div
      key="cuenta"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Información de Cuenta</CardTitle>
          <CardDescription>Configura tu cuenta de usuario</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Correo en su propia fila */}
          <div className="grid grid-cols-1 gap-4">
            <div className="form-field">
              <Label htmlFor="correo" className="text-sm font-medium">Correo Electrónico</Label>
              <Input
                id="correo"
                name="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                value={form.correo}
                onChange={handleChange}
                className="h-10 rounded-lg"
                required
              />
              <span className="error-message">{errors.correo || " "}</span>
            </div>
          </div>

          {/* Contraseña y Confirmar Contraseña en la misma fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="password" className="text-sm font-medium">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="h-10 rounded-lg"
                required
              />
              <span className="error-message">{errors.password || " "}</span>
            </div>

            <div className="form-field">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="********"
                value={form.confirmPassword}
                onChange={handleChange}
                className="h-10 rounded-lg"
                required
              />
              <span className="error-message">{errors.confirmPassword || " "}</span>
            </div>
          </div>

          {/* Rol y Estado Usuario en la misma fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="rolId" className="text-sm font-medium">Rol</Label>
              <Select 
                value={form.rolId} 
                onValueChange={(value) => handleSelectChange("rolId", value)}
              >
                <SelectTrigger id="rolId" className="h-10 rounded-lg">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {catalogos.roles.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="error-message">{errors.rolId || " "}</span>
            </div>

            <div className="form-field">
              <Label htmlFor="estadoUsuarioId" className="text-sm font-medium">Estado</Label>
              <Select 
                value={form.estadoUsuarioId} 
                onValueChange={(value) => handleSelectChange("estadoUsuarioId", value)}
              >
                <SelectTrigger id="estadoUsuarioId" className="h-10 rounded-lg">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {catalogos.estadosUsuario.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="error-message">{errors.estadoUsuarioId || " "}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSectionChange('profesional')}
          className="rounded-lg"
        >
          Anterior
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="rounded-lg"
          onClick={handleSubmit}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </Button>
      </div>
    </motion.div>
  );

  // Animaciones para la barra de progreso
  const progressVariants = {
    initial: { width: 0 },
    animate: { width: '100%', transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const circleVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.1, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="flex flex-col items-center text-center mb-2">
        <h1 className="text-2xl font-bold mb-2">Crear cuenta</h1>
        <p className="text-muted-foreground text-balance text-base max-w-md">
          Completa tus datos para registrarte en InfoCAR
        </p>
      </div>

      {/* Barra de progreso mejorada con animaciones */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <motion.div 
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
              activeSection === 'personal' ? 'bg-primary text-white' : 'bg-muted'
            }`}
            onClick={() => handleSectionChange('personal')}
            variants={circleVariants}
            animate={activeSection === 'personal' ? 'active' : 'inactive'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            1
          </motion.div>
          
          <div className="w-16 h-1 bg-muted overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              variants={{
                initial: { width: 0 },
                animate: { 
                  width: "100%",
                  transition: { 
                    duration: 0.3,
                    ease: [0.43, 0.13, 0.23, 0.96] // Use Framer Motion's built-in easing array
                  }
                }
              }}
              initial="initial"
              animate={activeSection !== 'personal' ? 'animate' : 'initial'}
            />
          </div>
          
          <motion.div 
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
              activeSection === 'profesional' ? 'bg-primary text-white' : 'bg-muted'
            }`}
            onClick={() => handleSectionChange('profesional')}
            variants={circleVariants}
            animate={activeSection === 'profesional' ? 'active' : 'inactive'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            2
          </motion.div>
          
          <div className="w-16 h-1 bg-muted overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              variants={{
                initial: { width: 0 },
                animate: { 
                  width: "100%",
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut"
                  }
                }
              }}
              initial="initial"
              animate={activeSection === 'cuenta' ? 'animate' : 'initial'}
            />
          </div>
          
          <motion.div 
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
              activeSection === 'cuenta' ? 'bg-primary text-white' : 'bg-muted'
            }`}
            onClick={() => handleSectionChange('cuenta')}
            variants={circleVariants}
            animate={activeSection === 'cuenta' ? 'active' : 'inactive'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            3
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSection === 'personal' && renderPersonalSection()}
        {activeSection === 'profesional' && renderProfesionalSection()}
        {activeSection === 'cuenta' && renderCuentaSection()}
      </AnimatePresence>
    </div>
  );
}