"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatRut, validateRut } from "@/lib/rut";
import RegisterMiniForm from "@/components/auth/RegisterMiniForm";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import router from "next/router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Estado del login
  const [rut, setRut] = useState("");
  const [errors, setErrors] = useState<{ rut?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Toggle para mostrar el registro integrado
  const [showRegister, setShowRegister] = useState(false);

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setRut(formatted);

    // Validación temprana del RUT
    if (formatted.length >= 11 && !validateRut(formatted)) {
      setErrors((prev) => ({ ...prev, rut: "RUT inválido" }));
    } else {
      setErrors((prev) => ({ ...prev, rut: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!validateRut(rut)) {
      newErrors.rut = "RUT inválido";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsLoading(true);
      setErrors({});
      // Aquí iría la lógica real de login (fetch a tu API)
      await new Promise((r) => setTimeout(r, 800));
      console.log("Login:", { rut });
      router.push('/dashboard');
    } catch (err) {
      setErrors({ general: "Error en el inicio de sesión, intenta nuevamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mx-auto ", className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-xl rounded-xl ">
        <CardContent className="p-0">
          <div className="flex flex-row min-h-[400px]">
            {/* Columna de imagen con animación */}
            <AnimatePresence>
              {!showRegister && (
                <motion.div 
                  className="hidden md:block w-1/2 bg-gray-100 flex-shrink-0"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "50%" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <img 
                      src="/infocard_logo.png" 
                      alt="InfoCAR Logo" 
                      className="object-contain h-full w-full"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x800/e2e8f0/64748b?text=InfoCAR";
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Columna de formulario */}
            <motion.div 
              className="w-full relative"
              animate={{ 
                width: showRegister ? "100%" : "50%"
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Botón de volver en la parte superior */}
              {showRegister && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-4 left-4 p-2 h-10 w-10 rounded-full"
                  onClick={() => setShowRegister(false)}
                >
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Volver</span>
                </Button>
              )}

              <AnimatePresence mode="wait">
                {!showRegister ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex items-center"
                  >
                    <form className="p-6 md:p-8 w-full" onSubmit={handleSubmit} noValidate>
                      <div className="flex flex-col gap-4 w-full max-w-lg mx-auto justify-center">
                        <div className="flex flex-col items-center text-center mb-4">
                          <h1 className="text-3xl font-bold mb-2">¡Bienvenido!</h1>
                          <p className="text-muted-foreground text-balance text-lg">
                            Inicia sesión en InfoCAR
                          </p>
                        </div>

                        {errors.general && (
                          <div className="text-sm text-red-600 bg-red-50 p-4 rounded-lg">{errors.general}</div>
                        )}

                        <div className="w-full ">
                          {/* RUT */}
                          <div className="form-field text-center">
                            <Label htmlFor="rut" className="text-base font-medium">RUT</Label>
                            <Input
                              id="rut"
                              type="text"
                              placeholder="12.345.678-9"
                              value={rut}
                              onChange={handleRutChange}
                              aria-invalid={!!errors.rut}
                              required
                              className="h-12 text-base px-4 rounded-lg mx-auto"
                            />
                            <span className="error-message">{errors.rut || " "}</span>
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full h-12 text-base font-medium mt-2 rounded-lg" 
                            disabled={isLoading}
                          >
                            {isLoading ? "Ingresando..." : "Ingresar"}
                          </Button>

                          <div className="text-center text-sm mt-4">
                            ¿No tienes una cuenta?{" "}
                            <button
                              type="button"
                              className="font-medium underline underline-offset-4 hover:text-primary"
                              onClick={() => setShowRegister(true)}
                            >
                              Regístrate
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 md:p-12"
                  >
                    <RegisterMiniForm onBackToLogin={() => setShowRegister(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
