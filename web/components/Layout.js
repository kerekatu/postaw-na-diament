import Header from '@/components/Header'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="min-h-full max-w-7xl mx-auto p-10">{children}</div>
      </main>
      <footer className="h-20 px-10">
        <div className="flex items-center justify-center h-full mx-auto max-w-7xl px-10">
          Made with ❤️ @ 2021 Konrad R.
        </div>
      </footer>
    </div>
  )
}

export default Layout
