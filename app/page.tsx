export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Matra Tecnologia Dashboard</h1>
      <p className="mt-4 text-xl">Bem-vindo ao dashboard</p>
      <div className="mt-8">
        <a href="/dashboard" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Acessar Dashboard
        </a>
      </div>
    </div>
  )
}
