import { Product } from '@/types/Product'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  displayAsGrid: boolean
}

export default function ProductCard({
  product: { name, price, image_url },
  displayAsGrid,
}: ProductCardProps) {
  return (
    <div
      className={
        'bg-gray-800 p-3 rounded-xl' +
        (!displayAsGrid ? ' grid grid-cols-[auto_1fr] gap-x-3' : '')
      }
    >
      <div
        className={
          'relative aspect-square' + (!displayAsGrid ? ' row-span-2' : '')
        }
      >
        <Image
          src={image_url}
          alt={name}
          fill
          sizes={displayAsGrid ? '(max-width:550px) 250px, 350px' : '48px'}
        />
      </div>

      <h2 className={'before:hidden' + (displayAsGrid ? ' mt-2' : '')}>
        {name}
      </h2>
      
      <div>{price} kr</div>
    </div>
  )
}
