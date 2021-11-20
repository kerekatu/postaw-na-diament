import Link from 'next/link'

// const NAV_OPTIONS = [{ label: 'Utwórz pokój', href: '/create-room' }]

const Header = () => {
  return (
    <header className="bg-gray-700 shadow-md">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-10">
        <Link href="/">
          <a className="text-xl font-bold transition-colors hover:text-white">
            Postaw na Diament
          </a>
        </Link>
        <ul className="flex gap-8">
          {/* {NAV_OPTIONS.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <a>{item.label}</a>
              </Link>
            </li>
          ))} */}
          <li>
            <Link href="/create-room">
              <a className="text-lg transition-colors hover:text-white">
                Utwórz Pokój
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
