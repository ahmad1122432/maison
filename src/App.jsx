import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-16 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
      <footer className="border-t border-neutral-200 px-6 py-12 text-xs tracking-widest text-neutral-500 uppercase">
        © 2026 MAISON — Quiet clothing, made properly.
      </footer>
    </>
  )
}
