import type { Product } from '@/types'
import { useState, useEffect } from 'react'

interface ProductCardProps {
  product: Product
  averagePriceByColor: Record<string, number>
  selectedColors?: string[]
}

export default function ProductCard({ product, averagePriceByColor, selectedColors = [] }: ProductCardProps) {
  const [isSelectedColor, setIsSelectedColor] = useState<'true' | 'false' | null>('true')

  useEffect(() => {
    if (selectedColors.length > 0) {
      if (selectedColors.includes(product.color)) {
        setIsSelectedColor('true')
      } else {
        setIsSelectedColor('false')
      }
    }
  }, [selectedColors, product.color, averagePriceByColor])
  
  const calculateDiscount = () => {  
    if (product.price > 500) {
      const oldPrice = product.price
      const newPrice = 1 - 0.25 * product.price
      return oldPrice - newPrice
    }
    
    return 0.00
  }
  const discount = calculateDiscount()
  
  const getColorStyle = () => {
    switch (product.color) {
      case 'red':
        return 'bg-red-500'
      case 'blue':
        return 'bg-blue-500'
      case 'green':
        return 'bg-green-500'
      case 'black':
        return 'bg-black text-white'
      case 'white':
        return 'bg-white border border-gray-200'
      default:
        return 'bg-gray-200'
    }
  }
  
  return (
    <div className={`${isSelectedColor === 'false' ? 'hidden' : 'block'} p-6 border hover:shadow-sm transition-shadow`}>
      <div className="flex items-center gap-2">
      <div className={`size-6 rounded ${getColorStyle()}`} />
      <h3 className="text-md font-bold text-balance">{product.name}</h3>
      </div>
      <p className="text-sm text-gray-600 my-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <div>
          <p>
            <span className={`font-bold ${discount > 0 && 'line-through font-light'}`}>${product.price.toFixed(2)}</span>
            {discount > 0 && <span className='ml-2 font-bold'>${(product.price - discount).toFixed(2)}</span>}
          </p>
          {discount > 0 && (<div className="text-xs text-red-500">Save ${discount}</div>) }
          <p className="text-xs mt-1 font-semibold">
            {product.price > averagePriceByColor[product.color]
              ? `${Math.round((product.price / averagePriceByColor[product.color] - 1) * 100)}% above avg for this color.`
              : `${Math.round((1 - product.price / averagePriceByColor[product.color]) * 100)}% below avg for this color`
            }
          </p>
        </div>
        <button 
          disabled
          className="px-3 py-1 bg-gray-500/50 text-white rounded cursor-not-allowed"
          >
          Add to cart
        </button>
      </div>
    </div>
  )
} 