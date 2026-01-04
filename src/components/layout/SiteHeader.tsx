export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-lg font-black text-white shadow-lg">
            DP
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Dom Pedro Delivery</p>
            <p className="text-xs text-gray-500">Tecnologia para restaurantes</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <a href="#features" className="transition hover:text-gray-900">
            Recursos
          </a>
          <a href="#steps" className="transition hover:text-gray-900">
            Como funciona
          </a>
          <a href="#plans" className="transition hover:text-gray-900">
            Planos
          </a>
          <a href="#contact" className="transition hover:text-gray-900">
            Contato
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-2xl px-4 py-2 text-sm font-semibold text-gray-600 transition hover:text-gray-900">
            Login
          </button>
          <button className="rounded-2xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700">
            Criar conta
          </button>
        </div>
      </div>
    </header>
  );
}

