import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, Check } from 'lucide-react'
import { getProduct, money } from '../data/products'
import { useCart } from '../store'

export default function Product() {
  const { id } = useParams()
  const p = getProduct(id)
  const add = useCart((s) => s.add)
  const [img, setImg] = useState(0)
  const [size, setSize] = useState(null)
  const [zoom, setZoom] = useState(null)
  const [added, setAdded] = useState(false)
  const [err, setErr] = useState(false)

  if (!p) return <div className="p-20 text-center">Product not found. <Link to="/shop" className="underline">Back to shop</Link></div>

  const onAdd = () => {
    if (!size) return setErr(true)
    add(p.id, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
  }
  const specs = [['Description', p.description], ['Fabric & composition', p.fabric], ['Care', p.care], ['Shipping & returns', 'Free returns within 30 days. Standard delivery in 3–5 working days.']]

  return (
    <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-10 md:px-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="flex flex-col-reverse gap-3 md:flex-row">
        <div className="flex gap-3 md:flex-col">
          {p.images.map((src, i) => (
            <button key={i} onClick={() => setImg(i)} className={`h-24 w-20 overflow-hidden border ${img === i ? 'border-neutral-900' : 'border-transparent opacity-60'}`}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <div className="aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden bg-neutral-100" onMouseMove={move} onMouseLeave={() => setZoom(null)}>
          <img src={p.images[img]} alt={p.name} className="h-full w-full object-cover transition-transform duration-200"
            style={{ transform: zoom ? 'scale(2)' : 'scale(1)', transformOrigin: zoom || 'center' }} />
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">{p.category}</p>
        <h1 className="mt-2 font-serif text-4xl">{p.name}</h1>
        <p className="mt-2 text-lg">{money(p.price)}</p>
        <p className="mt-1 text-sm text-neutral-500">Colour: {p.color}</p>

        <div className="mt-8">
          <p className={`mb-3 text-xs tracking-[0.2em] uppercase ${err ? 'text-red-600' : ''}`}>{err ? 'Please select a size' : 'Size'}</p>
          <div className="flex flex-wrap gap-2">
            {p.sizes.map((s) => {
              const out = p.stock[s] === 0
              return (
                <button key={s} disabled={out} onClick={() => { setSize(s); setErr(false) }}
                  className={`min-w-14 border px-4 py-3 text-sm transition ${size === s ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-neutral-900'} ${out ? 'cursor-not-allowed text-neutral-300 line-through hover:border-neutral-300' : ''}`}>{s}</button>
              )
            })}
          </div>
          {size && p.stock[size] <= 3 && <p className="mt-3 text-xs text-amber-700">Only {p.stock[size]} left</p>}
        </div>

        <button onClick={onAdd} className={`mt-8 flex w-full items-center justify-center gap-2 py-4 text-xs tracking-[0.25em] uppercase transition ${added ? 'bg-emerald-700 text-white' : 'bg-neutral-900 text-white hover:bg-neutral-700'}`}>
          {added ? <><Check size={16} /> Added to bag</> : 'Add to bag'}
        </button>

        <Accordion.Root type="single" collapsible defaultValue="Description" className="mt-10 border-t border-neutral-200">
          {specs.map(([t, body]) => (
            <Accordion.Item key={t} value={t} className="border-b border-neutral-200">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-xs tracking-[0.2em] uppercase">
                  {t}<ChevronDown size={16} className="transition group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden pb-4 text-sm leading-relaxed text-neutral-600">{body}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </div>
  )
}
