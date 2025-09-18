// Función para formatear RUT mientras se escribe (máximo 12 caracteres)
export const formatRut = (value: string): string => {
  // Remover puntos, guiones y espacios
  const cleanRut = value.replace(/[.-\s]/g, '');
  
  // Limitar a 9 caracteres (8 números + 1 dígito verificador)
  const limitedRut = cleanRut.slice(0, 9);
  
  if (limitedRut.length <= 1) return limitedRut;
  
  // Separar número del dígito verificador
  const rutNumber = limitedRut.slice(0, -1);
  const dv = limitedRut.slice(-1);
  
  // Formatear con puntos cada 3 dígitos
  const formattedNumber = rutNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  const formatted = `${formattedNumber}-${dv}`;
  
  // Limitar a 12 caracteres totales (incluyendo puntos y guión)
  return formatted.slice(0, 12);
};

// Función para validar RUT chileno
export const validateRut = (rut: string): boolean => {
  if (!rut || rut.length < 8) return false;
  
  // Limpiar RUT
  const cleanRut = rut.replace(/[.-\s]/g, '').toUpperCase();
  
  if (cleanRut.length < 8 || cleanRut.length > 9) return false;
  
  const rutNumber = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);
  
  // Validar que el número sea numérico
  if (!/^\d+$/.test(rutNumber)) return false;
  
  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;
  
  for (let i = rutNumber.length - 1; i >= 0; i--) {
    sum += parseInt(rutNumber[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const calculatedDv = 11 - (sum % 11);
  const expectedDv = calculatedDv === 11 ? '0' : calculatedDv === 10 ? 'K' : calculatedDv.toString();
  
  return dv === expectedDv;
};

// Función para normalizar RUT (formato para BD)
export const normalizeRut = (rut: string): string => {
  return rut.replace(/[.-\s]/g, '').toUpperCase();
};