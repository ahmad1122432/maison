import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { products, categories, allSizes } from '../data/products'
import ProductCard from '../components/ProductCard'

const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])
const sorts = { featured: 'Featured', low: 'Price: Low to High', high: 'Price: High to Low', new: 'Newest' }

export default function Shop() {
  const [params] = useSearchParams()
  const cat = params.get('cat')
  const [cats, setCats] = useState(cat ? [cat] : [])
  const [sizes, setSizes] = useState([])
  const [max, setMax] = useState(350)
  const [sort, setSort] = useState('featured')
  const [show, setShow] = useState(false)
  useEffect(() => setCats(cat ? [cat] : []), [cat])

  const list = useMemo(() => {
    let l = products.filter((p) =>
      (!cats.length || cats.includes(p.category)) && p.price <= max &&
      (!sizes.length || sizes.some((s) => p.stock[s] > 0)))
    if (sort === 'low') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'high') l = [...l].sort((a, b) => b.price - a.price)
    if (sort === 'new') l = [...l].sort((a, b) => b.isNew - a.isNew)
    return l
  }, [cats, sizes, max, sort])

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
      <div className="mb-8 flex items-end justify-between border-b border-neutral-200 pb-4">
        <div><h1 className="font-serif text-4xl">Shop</h1><p className="mt-1 text-xs text-neutral-500">{list.length} products</p></div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xs uppercase md:hidden" onClick={() => setShow(!show)}><SlidersHorizontal size={14} />Filters</button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-b border-neutral-900 bg-transparent py-1 text-xs outline-none">
            {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className={`${show ? 'block' : 'hidden'} md:sticky md:top-24 md:block md:self-start`}>
          <div className="space-y-8 text-sm">
            <div><h3 className="mb-3 text-xs tracking-[0.2em] uppercase">Category</h3>
              {categories.map((c) => (
                <label key={c} className="flex cursor-pointer items-center gap-2 py-1">
                  <input type="checkbox" className="accent-black" checked={cats.includes(c)} onChange={() => setCats(toggle(cats, c))} />{c}
                </label>
              ))}
            </div>
            <div><h3 className="mb-3 text-xs tracking-[0.2em] uppercase">Size</h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((s) => (
                  <button key={s} onClick={() => setSizes(toggle(sizes, s))}
                    className={`border px-3 py-1.5 text-xs ${sizes.includes(s) ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300'}`}>{s}</button>
                ))}
              </div>
            </div>
            <div><h3 className="mb-3 text-xs tracking-[0.2em] uppercase">Max price: ${max}</h3>
              <input type="range" min="50" max="350" step="10" value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-black" />
            </div>
            <button onClick={() => { setCats([]); setSizes([]); setMax(350) }} className="text-xs underline underline-offset-4">Clear all</button>
          </div>
        </aside>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
          {list.length === 0 && <p className="col-span-full py-20 text-center text-neutral-500">No products match these filters.</p>}
        </div>
      </div>
    </div>
  )
}
