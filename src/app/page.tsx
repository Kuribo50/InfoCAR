"use client" 
import { LoginForm } from "@/components/auth/login-form";


export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
