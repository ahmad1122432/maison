import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { products, getProduct, money } from '../data/products'
import ProductCard from '../components/ProductCard'

const spots = [
  { id: 'p1', x: 46, y: 38 },
  { id: 'p3', x: 54, y: 52 },
  { id: 'p9', x: 49, y: 62 },
  { id: 'p7', x: 50, y: 78 },
]

export default function Home() {
  const [active, setActive] = useState(null)
  const p = active && getProduct(active)
  return (
    <>
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden bg-neutral-200">
        <motion.img initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }}
          src="https://picsum.photos/seed/maison-hero/1800/1200" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-12 left-6 max-w-xl text-white md:left-12">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-3 text-xs tracking-[0.35em] uppercase">Autumn / Winter 26</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-serif text-5xl leading-none md:text-7xl">The Quiet<br />Wardrobe</motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <Link to="/shop" className="mt-8 inline-block border border-white px-8 py-3 text-xs tracking-[0.25em] uppercase transition hover:bg-white hover:text-black">Shop the collection</Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-serif text-3xl">Featured</h2>
          <Link to="/shop" className="text-xs tracking-widest uppercase underline underline-offset-8">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {[products[0], products[2], products[7], products[9]].map((x) => <ProductCard key={x.id} p={x} />)}
        </div>
      </section>

      <section className="bg-neutral-100 py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:grid-cols-2 md:px-8">
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-300">
            <img src="https://picsum.photos/seed/maison-look/1000/1300" alt="Look" className="h-full w-full object-cover" />
            {spots.map((s) => (
              <button key={s.id} onClick={() => setActive(active === s.id ? null : s.id)} style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2" aria-label={getProduct(s.id).name}>
                <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
                <span className={`relative grid h-7 w-7 place-items-center rounded-full bg-white shadow transition ${active === s.id ? 'rotate-45' : ''}`}><Plus size={14} /></span>
              </button>
            ))}
          </div>
          <div>
            <p className="mb-2 text-xs tracking-[0.3em] uppercase text-neutral-500">Shop the look</p>
            <h2 className="mb-8 font-serif text-4xl">Layered, unhurried.</h2>
            <AnimatePresence mode="wait">
              {p ? (
                <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-4 bg-white p-4">
                  <img src={p.images[0]} alt="" className="h-32 w-24 object-cover" />
                  <div className="flex flex-col">
                    <p>{p.name}</p><p className="text-sm text-neutral-500">{p.color} · {money(p.price)}</p>
                    <Link to={`/product/${p.id}`} className="mt-auto text-xs tracking-widest uppercase underline underline-offset-4">View product</Link>
                  </div>
                </motion.div>
              ) : (
                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-neutral-500">Tap a pin to discover each piece.</motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}
