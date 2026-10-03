import { useState, useMemo } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { products, money } from '../data/products'
import { useCart, useCount } from '../store'

export default function Header() {
  const [q, setQ] = useState('')
  const [searching, setSearching] = useState(false)
  const [menu, setMenu] = useState(false)
  const nav = useNavigate()
  const count = useCount()
  const setOpen = useCart((s) => s.setOpen)
  const results = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? products.filter((p) => (p.name + p.category + p.color).toLowerCase().includes(t)).slice(0, 5) : []
  }, [q])
  const go = (path) => { setQ(''); setSearching(false); setMenu(false); nav(path) }
  const link = ({ isActive }) => `text-xs tracking-[0.2em] uppercase hover:opacity-60 ${isActive ? 'underline underline-offset-8' : ''}`

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-neutral-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-5 md:px-8">
        <button className="md:hidden" onClick={() => setMenu(true)} aria-label="Menu"><Menu size={20} /></button>
        <nav className="hidden gap-8 md:flex">
          <NavLink to="/shop" end className={link}>Shop</NavLink>
          <button onClick={() => go('/shop?cat=Outerwear')} className="text-xs tracking-[0.2em] uppercase hover:opacity-60">Outerwear</button>
          <button onClick={() => go('/shop?cat=Knitwear')} className="text-xs tracking-[0.2em] uppercase hover:opacity-60">Knitwear</button>
        </nav>
        <Link to="/" className="font-serif text-xl tracking-[0.35em]">MAISON</Link>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex items-center gap-2">
              <AnimatePresence>
                {searching && (
                  <motion.input autoFocus initial={{ width: 0, opacity: 0 }} animate={{ width: 180, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                    value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search"
                    className="hidden border-b border-neutral-900 bg-transparent py-1 text-sm outline-none sm:block" />
                )}
              </AnimatePresence>
              <button onClick={() => (searching ? (setSearching(false), setQ('')) : setSearching(true))} aria-label="Search">
                {searching ? <X size={20} /> : <Search size={20} />}
              </button>
            </div>
            {results.length > 0 && (
              <div className="absolute right-0 mt-3 w-72 border border-neutral-200 bg-white shadow-xl">
                {results.map((p) => (
                  <button key={p.id} onClick={() => go(`/product/${p.id}`)} className="flex w-full items-center gap-3 p-2 text-left hover:bg-neutral-50">
                    <img src={p.images[0]} className="h-14 w-11 object-cover" alt="" />
                    <span className="flex-1 text-sm">{p.name}<br /><span className="text-xs text-neutral-500">{p.category}</span></span>
                    <span className="text-sm">{money(p.price)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="relative" onClick={() => setOpen(true)} aria-label="Cart">
            <ShoppingBag size={20} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-neutral-900 px-1 text-[10px] text-white">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-white p-6 md:hidden">
            <button className="self-end" onClick={() => setMenu(false)}><X size={24} /></button>
            <div className="mt-10 flex flex-col gap-6 font-serif text-3xl">
              {[['Shop all', '/shop'], ['Outerwear', '/shop?cat=Outerwear'], ['Knitwear', '/shop?cat=Knitwear'], ['Accessories', '/shop?cat=Accessories']].map(([l, p]) => (
                <button key={l} className="text-left" onClick={() => go(p)}>{l}</button>
              ))}
            </div>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products"
              className="mt-auto border-b border-neutral-900 py-2 outline-none" />
            {results.map((p) => <button key={p.id} className="py-2 text-left text-sm" onClick={() => go(`/product/${p.id}`)}>{p.name}</button>)}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
