import { Product } from '@/types/Product'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({
  product: { name, price, image_url },
}: ProductCardProps) {
  return (
    <div className="bg-gray-800 p-3 rounded-xl">
      <div className="relative aspect-square">
        <Image
          src={image_url}
          alt={name}
          fill
          sizes="(max-width:550px) 250px, 350px"
        />
      </div>
      <h2 className="before:hidden mt-2">{name}</h2>
      <div>{price} kr</div>
    </div>
  )
}
