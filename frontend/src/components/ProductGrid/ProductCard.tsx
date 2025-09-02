import { Product } from '@/types/Product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({
  product: { name, price },
}: ProductCardProps) {
  return (
    <div>
      <div>{name}</div>
      <div>{price} kr</div>
    </div>
  )
}
