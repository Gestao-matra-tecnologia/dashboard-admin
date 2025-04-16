export default function TestePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Página de Teste</h1>
      <p className="mt-4 text-xl">Se você está vendo esta página, o roteamento está funcionando!</p>
      <div className="mt-8">
        <a href="/" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Voltar para Home
        </a>
      </div>
    </div>
  )
}
