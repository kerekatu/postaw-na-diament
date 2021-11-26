import Header from '@/components/containers/Header'
import Footer from '@/components/containers/Footer'
import Head from 'next/head'

const Layout = ({ children, customMeta }) => {
  const meta = {
    title: 'Postaw na Diament',
    description:
      'Postaw na Diament to gra wieloosobowa polegająca na odpowiadaniu pytań przy pomocy wirtualnej waluty.',
    type: 'website',
    ...customMeta,
  }

  return (
    <>
      <Head>
        <title>
          {meta.title} {meta?.subtitle}
        </title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Postaw na Diament" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
      </Head>
      <div className="grid grid-rows-layout min-h-screen">
        {/* <Header /> */}
        <main>
          <div className="flex min-h-full max-w-7xl mx-auto p-10">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
