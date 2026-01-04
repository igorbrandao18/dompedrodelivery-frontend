const footerLinks = [
  { label: "Planos", href: "#plans" },
  { label: "Recursos", href: "#features" },
  { label: "Blog", href: "#" },
  { label: "Suporte", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-orange-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">Dom Pedro Delivery</p>
          <p className="mt-2 text-sm text-gray-500">
            Plataforma brasileira para cardápio digital e gestão de pedidos.
          </p>
          <p className="mt-4 text-xs text-gray-400">© {new Date().getFullYear()} Dom Pedro Tecnologia.</p>
        </div>

        <div className="grid gap-2 text-sm text-gray-600 md:grid-cols-2">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-orange-600">
              {link.label}
            </a>
          ))}
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p className="font-semibold text-gray-800">Fale com a gente</p>
          <a href="mailto:contato@dompedrodelivery.com" className="block hover:text-orange-600">
            contato@dompedrodelivery.com
          </a>
          <a href="tel:+5511999990000" className="block hover:text-orange-600">
            +55 11 99999-0000
          </a>
        </div>
      </div>
    </footer>
  );
}

