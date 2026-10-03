import { Link } from 'react-router-dom'
import { money } from '../data/products'

export default function ProductCard({ p }) {
  const sold = Object.values(p.stock).every((n) => n === 0)
  return (
    <Link to={`/product/${p.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img src={p.images[0]} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
        <img src={p.images[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100" />
        {p.isNew && <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] tracking-widest uppercase">New</span>}
        {sold && <span className="absolute inset-x-0 bottom-0 bg-white/90 py-2 text-center text-[10px] tracking-widest uppercase">Sold out</span>}
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <div><p>{p.name}</p><p className="text-xs text-neutral-500">{p.color}</p></div>
        <p>{money(p.price)}</p>
      </div>
    </Link>
  )
}
