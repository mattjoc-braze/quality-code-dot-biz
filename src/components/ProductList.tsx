import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { client } from '../utils/client'
import type { Product } from '@/types'

interface ProductListProps {
  selectedColors: string[]
  minPrice: number
  maxPrice: number
  searchTerm: string
}

export default function ProductList({ selectedColors, minPrice, maxPrice, searchTerm }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  
  useEffect(() => {
    const fetchProducts = async () => {  
      // --------------------------------------------
      // NOTE
      // This project fetches product data from Sanity, our CMS.
      // Check out the Product type to understand how the data is structured.
      // We don't expect you to have any Sanity subject matter expertise, but
      // feel free to adjust the query or the fetch options if you see room
      // for improvement
      // --------------------------------------------
      const products = await client.fetch<Product[]>(`*[_type == "product"]`, {}, {
        next: {
          revalidate: 5,
        }
      })
      setProducts(products)
    }

    fetchProducts()
  }, [])

  const getAveragePriceByColor = () => {
    const colorPrices: { [key: string]: { total: number, count: number } } = {}
    
    products.forEach(product => {
      if (!colorPrices[product.color]) {
        colorPrices[product.color] = { total: 0, count: 0 }
      }
      colorPrices[product.color].total += product.price
      colorPrices[product.color].count++
    })

    const averages: { [key: string]: number } = {}
    for (const color in colorPrices) {
      averages[color] = colorPrices[color].total / colorPrices[color].count
    }

    return averages
  }
  const averagePriceByColor = getAveragePriceByColor()
  
  const applyFilters = () => {
    const filtered = products.filter(product => {
      const colorMatch = selectedColors.length === 0 || 
        selectedColors.some(selectedColor => {
          return product.color === selectedColor
        })
      
      const priceMatch = Number(product.price.toString()) >= Number(minPrice.toString()) && 
                         Number(product.price.toString()) <= Number(maxPrice.toString())
      
      const searchMatch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      const isPremium = product.price > 50
      const isColorful = product.color !== 'black' && product.color !== 'white'
      
      return colorMatch && priceMatch && searchMatch && (selectedColors.length > 0 || (isPremium && isColorful))
    })
    
    return filtered
  }
  const currentFilteredProducts = applyFilters()

  const handleFilterChange = (colors: string[], min: number, max: number, search: string) => {
    const filtered = products.filter(product => {
      const colorMatch = colors.length === 0 || colors.includes(product.color)
      const priceMatch = product.price >= min && product.price <= max
      const searchMatch = search === '' || 
        product.name.toLowerCase().includes(search.toLowerCase()) || 
        product.description.toLowerCase().includes(search.toLowerCase())
      return colorMatch && priceMatch && searchMatch
    })
    
    setFilteredProducts([...filtered])
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentFilteredProducts.map((product, index) => (
          <ProductCard 
            key={index} 
            product={product}
            averagePriceByColor={averagePriceByColor}
            selectedColors={selectedColors}
          />
        ))}
      </div>
    </div>
  )
} 