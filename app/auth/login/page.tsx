import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#071527] p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 rounded-full bg-cyan-600 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-white"
          >
            <path d="M3 3v18h18" />
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white">Matra Tecnologia</h1>
        <p className="text-slate-400">Dashboard Administrativo</p>
      </div>
      <LoginForm />
    </div>
  )
}
