const img = (id) => [1, 2, 3].map((n) => `https://picsum.photos/seed/maison-${id}-${n}/900/1200`)
const S = (a, b, c, d) => ({ S: a, M: b, L: c, XL: d })
const mk = (id, name, category, price, color, description, fabric, care, stock, isNew = false) => ({
  id, name, category, price, color, description, fabric, care, stock, isNew,
  sizes: Object.keys(stock), images: img(id),
})
const ONE = { 'One Size': 8 }

export const products = [
  mk('p1', 'Wool Overcoat', 'Outerwear', 329, 'Charcoal', 'A long, structured overcoat with a notch lapel and clean, hidden placket.', '80% Wool, 20% Polyamide', 'Dry clean only', S(3, 5, 4, 0), true),
  mk('p2', 'Waxed Field Jacket', 'Outerwear', 245, 'Olive', 'Water-resistant waxed cotton with four utility pockets and corduroy collar.', '100% Waxed Cotton', 'Spot clean, re-wax yearly', S(2, 4, 3, 2)),
  mk('p3', 'Merino Crewneck', 'Knitwear', 119, 'Oatmeal', 'Fine-gauge extra-fine merino. Soft, breathable, and made to layer.', '100% Merino Wool', 'Hand wash cold', S(6, 8, 5, 3), true),
  mk('p4', 'Cable Knit Cardigan', 'Knitwear', 159, 'Forest', 'Chunky cable-knit cardigan with horn buttons and ribbed trims.', '70% Lambswool, 30% Nylon', 'Hand wash cold', S(2, 3, 0, 1)),
  mk('p5', 'Oxford Button-Down', 'Shirts', 89, 'Sky Blue', 'Heavyweight oxford with a soft roll collar and relaxed fit.', '100% Organic Cotton', 'Machine wash 30°C', S(5, 7, 6, 4)),
  mk('p6', 'Linen Camp Shirt', 'Shirts', 95, 'Ecru', 'Breezy camp-collar shirt in washed European linen.', '100% European Linen', 'Machine wash 30°C', S(4, 6, 5, 0), true),
  mk('p7', 'Pleated Wool Trousers', 'Trousers', 139, 'Navy', 'Wide-leg, high-rise trousers with double pleats and a tapered hem.', '95% Wool, 5% Elastane', 'Dry clean only', S(3, 4, 4, 2)),
  mk('p8', 'Selvedge Denim', 'Trousers', 169, 'Indigo', 'Raw 13oz Japanese selvedge denim. Straight leg, built to age.', '100% Cotton Denim', 'Wash rarely, cold', S(2, 5, 5, 3)),
  mk('p9', 'Leather Belt', 'Accessories', 65, 'Cognac', 'Full-grain vegetable-tanned leather with a solid brass buckle.', '100% Full-grain Leather', 'Wipe with damp cloth', ONE),
  mk('p10', 'Cashmere Scarf', 'Accessories', 129, 'Camel', 'Generously sized scarf in brushed Mongolian cashmere.', '100% Cashmere', 'Dry clean only', ONE, true),
  mk('p11', 'Canvas Weekender', 'Accessories', 185, 'Sand', 'Heavy canvas weekender with leather handles and a brushed zip.', 'Cotton Canvas, Leather trim', 'Spot clean', ONE),
  mk('p12', 'Pique Polo', 'Shirts', 79, 'Cream', 'A tailored polo in a dense cotton piqué with a two-button placket.', '100% Pima Cotton', 'Machine wash 30°C', S(4, 6, 5, 3)),
]
export const categories = ['Outerwear', 'Knitwear', 'Shirts', 'Trousers', 'Accessories']
export const allSizes = ['S', 'M', 'L', 'XL', 'One Size']
export const getProduct = (id) => products.find((p) => p.id === id)
export const money = (n) => `$${n.toFixed(0)}`
