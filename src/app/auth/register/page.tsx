"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatRut, validateRut } from "@/lib/rut";
import Image from "next/image";

interface RegisterFormProps extends React.ComponentPropsWithoutRef<"div"> {
  logoUrl?: string;
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

export function RegisterForm({
  className,
  logoUrl = "/logo.png",
  backgroundImage = "/register-bg.jpg",
  title = "Únete a nosotros",
  subtitle = "Crea tu cuenta en el sistema",
  ...props
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
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
    estadoUsuarioId: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Datos de catálogos (en producción vendrían de la API)
  const [catalogos, setCatalogos] = useState({
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
      { id: "auxiliar", nombre: "Auxiliar" },
      { id: "otro", nombre: "Otro" }
    ],
    funciones: [
      { id: "jefa-salud-familiar", nombre: "Jefa Salud Familiar" },
      { id: "coordinadora-sar", nombre: "Coordinadora SAR" },
      { id: "coordinador-sector", nombre: "Coordinador de Sector" },
      { id: "supervisor", nombre: "Supervisor" },
      { id: "otro", nombre: "Otro" }
    ],
    establecimientos: [
      { id: "cesfam-1", nombre: "CESFAM San Juan" },
      { id: "cesfam-2", nombre: "CESFAM Villa Verde" },
      { id: "cecosf-1", nombre: "CECOSF Los Pinos" },
      { id: "sar-1", nombre: "SAR Central" }
    ],
    sectores: [
      { id: "sector-azul", nombre: "Sector Azul A6" },
      { id: "sector-verde", nombre: "Sector Verde B2" },
      { id: "sector-rojo", nombre: "Sector Rojo C1" },
      { id: "sector-amarillo", nombre: "Sector Amarillo D3" }
    ],
    roles: [
      { id: "lector", nombre: "Lector" },
      { id: "editor", nombre: "Editor" },
      { id: "administrador", nombre: "Administrador" }
    ],
    estadosUsuario: [
      { id: "activo", nombre: "Activo" },
      { id: "inactivo", nombre: "Inactivo" },
      { id: "pendiente", nombre: "Pendiente de Aprobación" }
    ]
  });

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatRut(value);
    
    setFormData(prev => ({ ...prev, rut: formatted }));
    
    // Validar RUT
    if (formatted.length >= 11) {
      if (!validateRut(formatted)) {
        setErrors(prev => ({ ...prev, rut: "RUT inválido" }));
      } else {
        setErrors(prev => ({ ...prev, rut: "" }));
      }
    } else {
      setErrors(prev => ({ ...prev, rut: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    // Validaciones
    if (!validateRut(formData.rut)) {
      newErrors.rut = "RUT inválido";
    }
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }
    
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    }
    
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "Correo inválido";
    }
    
    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Aquí implementarías la lógica de registro
        console.log("Register attempt:", formData);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación
      } catch (error) {
        console.error("Error en registro:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div  className={cn("min-h-screen flex", className)} {...props}>
      {/* Lado izquierdo - Imagen/Branding */}
      <div className="hidden lg:flex lg:w-2/5 relative">
        <div 
          className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex flex-col justify-center items-center p-8 text-white relative overflow-hidden"
          style={backgroundImage ? {
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.8)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : {}}
        >
          {/* Patrón decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 text-center">
            {logoUrl && (
              <div className="mb-6">
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="mx-auto filter brightness-0 invert"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-blue-100 mb-6">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-4xl">
          {/* Header móvil */}
          <div className="lg:hidden text-center mb-6">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt="Logo"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
            )}
            <h2 className="text-2xl font-bold text-gray-900">Crear Cuenta</h2>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="hidden lg:block mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h2>
              <p className="text-gray-600">Completa la información para registrarte en el sistema</p>
            </div>

            {/* Información Personal */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* RUT */}
                <div>
                  <Label htmlFor="rut" className="block text-sm font-medium text-gray-700 mb-1">
                    RUT *
                  </Label>
                  <Input
                    id="rut"
                    type="text"
                    placeholder="12.345.678-9"
                    value={formData.rut}
                    onChange={handleRutChange}
                    maxLength={12}
                    className={errors.rut ? "border-red-500" : ""}
                    required
                  />
                  {errors.rut && <p className="mt-1 text-sm text-red-500">{errors.rut}</p>}
                </div>

                {/* Nombre */}
                <div>
                  <Label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className={errors.nombre ? "border-red-500" : ""}
                    required
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
                </div>

                {/* Apellido Paterno */}
                <div>
                  <Label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido Paterno *
                  </Label>
                  <Input
                    id="apellido"
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange("apellido", e.target.value)}
                    className={errors.apellido ? "border-red-500" : ""}
                    required
                  />
                  {errors.apellido && <p className="mt-1 text-sm text-red-500">{errors.apellido}</p>}
                </div>

                {/* Apellido Materno */}
                <div>
                  <Label htmlFor="segundoApellido" className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido Materno
                  </Label>
                  <Input
                    id="segundoApellido"
                    type="text"
                    value={formData.segundoApellido}
                    onChange={(e) => handleInputChange("segundoApellido", e.target.value)}
                  />
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                  <Label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Nacimiento
                  </Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                  />
                </div>

                {/* Género */}
                <div>
                  <Label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">
                    Género
                  </Label>
                  <Select value={formData.generoId} onValueChange={(value) => handleInputChange("generoId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona género" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos.generos.map((genero) => (
                        <SelectItem key={genero.id} value={genero.id}>
                          {genero.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Información de Contacto
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Correo */}
                <div>
                  <Label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="correo"
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    value={formData.correo}
                    onChange={(e) => handleInputChange("correo", e.target.value)}
                    className={errors.correo ? "border-red-500" : ""}
                    required
                  />
                  {errors.correo && <p className="mt-1 text-sm text-red-500">{errors.correo}</p>}
                </div>
              </div>
            </div>

            {/* Información Laboral */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2zm2-3a1 1 0 011-1h2a1 1 0 011 1v1H8V5z" clipRule="evenodd" />
                </svg>
                Información Laboral
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Cargo */}
                <div>
                  <Label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                    Cargo
                  </Label>
                  <Select value={formData.cargoId} onValueChange={(value) => handleInputChange("cargoId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos.cargos.map((cargo) => (
                        <SelectItem key={cargo.id} value={cargo.id}>
                          {cargo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Función */}
                <div>
                  <Label htmlFor="funcion" className="block text-sm font-medium text-gray-700 mb-1">
                    Función
                  </Label>
                  <Select value={formData.funcionId} onValueChange={(value) => handleInputChange("funcionId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona función" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos.funciones.map((funcion) => (
                        <SelectItem key={funcion.id} value={funcion.id}>
                          {funcion.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Establecimiento */}
                <div>
                  <Label htmlFor="establecimiento" className="block text-sm font-medium text-gray-700 mb-1">
                    Establecimiento
                  </Label>
                  <Select value={formData.establecimientoId} onValueChange={(value) => handleInputChange("establecimientoId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona establecimiento" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos.establecimientos.map((establecimiento) => (
                        <SelectItem key={establecimiento.id} value={establecimiento.id}>
                          {establecimiento.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sector */}
                <div>
                  <Label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
                    Sector
                  </Label>
                  <Select value={formData.sectorId} onValueChange={(value) => handleInputChange("sectorId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos.sectores.map((sector) => (
                        <SelectItem key={sector.id} value={sector.id}>
                          {sector.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Información de Seguridad */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Información de Seguridad
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contraseña */}
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                    required
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>

                {/* Confirmar Contraseña */}
                <div>
                  <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Contraseña *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repite la contraseña"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                    required
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Información del Sistema */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
                Información del Sistema
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rol */}
                <div>
                  <Label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
                    Rol del Sistema
                  </Label>
                  <Select value={formData.rolId} onValueChange={(value) => handleInputChange("rolId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos.roles.map((rol) => (
                        <SelectItem key={rol.id} value={rol.id}>
                          {rol.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Estado Usuario */}
                <div>
                  <Label htmlFor="estadoUsuario" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado del Usuario
                  </Label>
                  <Select value={formData.estadoUsuarioId} onValueChange={(value) => handleInputChange("estadoUsuarioId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {catalogos.estadosUsuario.map((estado) => (
                        <SelectItem key={estado.id} value={estado.id}>
                          {estado.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando cuenta...
                  </div>
                ) : (
                  "Crear Cuenta"
                )}
              </Button>
            </div>

            {/* Enlaces adicionales */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <a href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return <RegisterForm />;
}