import { footer } from '@/lib/content'
import { contactLinks } from '@/lib/config'

export function SiteFooter() {
  return (
    <footer className="bg-ink pb-28 text-milk md:pb-0">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-milk/10 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12">
        <p className="font-serif text-lg tracking-[0.2em]">
          {footer.name}
          <span className="ml-3 font-sans text-[10px] uppercase tracking-[0.3em] text-milk/60">{footer.location}</span>
        </p>
        <ul className="flex flex-wrap gap-x-6">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center text-[10px] uppercase tracking-[0.3em] text-milk/70 hover:text-milk"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
