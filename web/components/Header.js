import Link from 'next/link'

const NAV_OPTIONS = [
  { label: 'Zaloguj', href: '/zaloguj' },
  { label: 'Zarejestruj', href: '/zarejestruj' },
]

const Header = () => {
  return (
    <header className="gap-24 h-20 bg-gray-700">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-10">
        <Link href="/">
          <a className="text-xl font-bold">Postaw na Tunkę</a>
        </Link>
        <ul className="flex gap-8">
          {NAV_OPTIONS.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <a>{item.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Header
