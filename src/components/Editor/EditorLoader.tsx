'use client';

import * as React from 'react';
import { FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorLoaderProps {
  isLoading?: boolean;
  loadingText?: string;
  progress?: number;
  status?: 'loading' | 'success' | 'error' | 'idle';
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

export function EditorLoader({
  isLoading = true,
  loadingText = 'Cargando Editor',
  progress,
  status = 'loading',
  message = 'Preparando el entorno de edición...',
  className,
  fullScreen = true,
}: EditorLoaderProps) {
  if (!isLoading && status === 'idle') {
    return null;
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin text-teal-600" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return <FileText className="h-8 w-8 text-teal-600 animate-pulse" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent';
    }
  };

  const containerClasses = fullScreen 
    ? 'flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'
    : 'flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg';

  return (
    <div className={cn(containerClasses, className)}>
      <div className="relative">
        {/* Logo animado */}
        <div className="w-16 h-16 mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-teal-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-teal-600 border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
            {status === 'loading' ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            ) : (
              getStatusIcon()
            )}
          </div>
        </div>

        {/* Texto de carga */}
        <div className="text-center">
          <h2 className={cn('text-2xl font-bold mb-2', getStatusColor())}>
            {status === 'success' && 'Editor Cargado'}
            {status === 'error' && 'Error de Carga'}
            {(status === 'loading' || status === 'idle') && loadingText}
          </h2>
          <p className="text-slate-600 mb-6">{message}</p>
          
          {/* Barra de progreso */}
          {progress !== undefined && status === 'loading' && (
            <div className="w-64 mb-4">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Progreso</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          )}

          {/* Barra de progreso animada por defecto */}
          {progress === undefined && status === 'loading' && (
            <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Puntos de carga */}
        {status === 'loading' && (
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}
      </div>

      {/* Elementos decorativos */}
      {fullScreen && (
        <>
          <div className="absolute top-10 left-10 w-20 h-20 bg-teal-100 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-100 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-20 w-12 h-12 bg-slate-200 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </>
      )}
    </div>
  );
}

// Skeleton loader for editor content
export function EditorSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {/* Toolbar skeleton */}
      <div className="flex space-x-2 border-b pb-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-8 bg-slate-200 rounded animate-pulse"
          />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-4/5 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
      </div>

      {/* Image placeholder skeleton */}
      <div className="h-32 bg-slate-200 rounded animate-pulse" />

      {/* More content skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
      </div>
    </div>
  );
}

// Mini loader for specific actions
export function EditorMiniLoader({
  text = 'Guardando...',
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center space-x-2 text-sm text-slate-600', className)}>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{text}</span>
    </div>
  );
}

export default EditorLoader;