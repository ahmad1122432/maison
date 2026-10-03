import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus } from 'lucide-react'
import { useCart, useSubtotal, FREE_SHIPPING } from '../store'
import { getProduct, money } from '../data/products'

export default function CartDrawer() {
  const { items, open, setOpen, setQty, remove } = useCart()
  const subtotal = useSubtotal()
  const left = Math.max(0, FREE_SHIPPING - subtotal)
  const pct = Math.min(100, (subtotal / FREE_SHIPPING) * 100)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-black/40" />
          <motion.aside key="panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.45 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 p-5">
              <h2 className="text-xs tracking-[0.25em] uppercase">Bag ({items.reduce((n, i) => n + i.qty, 0)})</h2>
              <button onClick={() => setOpen(false)} aria-label="Close"><X size={20} /></button>
            </div>
            <div className="border-b border-neutral-200 p-5">
              <p className="mb-2 text-xs">{left > 0 ? <>Add <b>{money(left)}</b> more for free shipping</> : <b>You've unlocked free shipping</b>}</p>
              <div className="h-1 bg-neutral-200"><motion.div className="h-full bg-neutral-900" animate={{ width: `${pct}%` }} /></div>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {items.length === 0 && (
                <div className="pt-16 text-center text-sm text-neutral-500">
                  Your bag is empty.<br />
                  <Link to="/shop" onClick={() => setOpen(false)} className="mt-4 inline-block underline underline-offset-4">Continue shopping</Link>
                </div>
              )}
              <AnimatePresence initial={false}>
                {items.map((i) => {
                  const p = getProduct(i.id)
                  return (
                    <motion.div layout key={i.id + i.size} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4">
                      <Link to={`/product/${p.id}`} onClick={() => setOpen(false)}><img src={p.images[0]} alt="" className="h-28 w-24 object-cover" /></Link>
                      <div className="flex flex-1 flex-col text-sm">
                        <div className="flex justify-between"><span>{p.name}</span><span>{money(p.price * i.qty)}</span></div>
                        <span className="text-xs text-neutral-500">{p.color} · {i.size}</span>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-neutral-300">
                            <button className="p-2" onClick={() => setQty(i.id, i.size, i.qty - 1)} aria-label="Decrease"><Minus size={12} /></button>
                            <span className="w-6 text-center text-xs">{i.qty}</span>
                            <button className="p-2 disabled:opacity-30" disabled={i.qty >= p.stock[i.size]} onClick={() => setQty(i.id, i.size, i.qty + 1)} aria-label="Increase"><Plus size={12} /></button>
                          </div>
                          <button className="text-xs text-neutral-500 underline" onClick={() => remove(i.id, i.size)}>Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
            {items.length > 0 && (
              <div className="border-t border-neutral-200 p-5">
                <div className="mb-1 flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                <p className="mb-4 text-xs text-neutral-500">Shipping & taxes calculated at checkout.</p>
                <button className="w-full bg-neutral-900 py-4 text-xs tracking-[0.25em] text-white uppercase hover:bg-neutral-700">Checkout</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
