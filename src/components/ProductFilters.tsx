import { useState } from 'react'

interface ProductFiltersProps {
  onFilterChange: (selectedColors: string[], minPrice: number, maxPrice: number, searchTerm: string) => void
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [selectedColors, setSelectedColors] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleColorChange = (color: string) => {
    let newColors
    if (selectedColors.includes(color)) {
      newColors = selectedColors.filter(c => c !== color)
    } else {
      newColors = [...selectedColors, color]
    }
    setSelectedColors(newColors)
    
    onFilterChange(newColors, minPrice, maxPrice, searchTerm)
  }
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setMinPrice(value)
    onFilterChange(selectedColors, value, maxPrice, searchTerm)
  }
  
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setMaxPrice(value)
    onFilterChange(selectedColors, minPrice, value, searchTerm)
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onFilterChange(selectedColors, minPrice, maxPrice, value)
  }
  
  const priceRanges = [
    { min: 0, max: 250, label: 'Under $250' },
    { min: 250, max: 500, label: '$250 - $500' },
    { min: 500, max: 750, label: '$500 - $750' },
    { min: 750, max: 1000, label: '$750 - $1000' },
    { min: 1000, max: 10000, label: 'Over $1000' },
  ]
  
  const applyPriceRange = (min: number, max: number) => {
    setMinPrice(min)
    setMaxPrice(max)
    onFilterChange(selectedColors, min, max, searchTerm)
  }
  
  return (
    <div className="p-4 border rounded mb-6">
      <h3 className="text-lg font-bold mb-4">Filters</h3>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2">Search</h4>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full border rounded p-2"
        />
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2">Colors</h4>
        <div className="flex flex-wrap gap-2">
          {['red', 'blue', 'green', 'black', 'white'].map((color) => (
            <button
              key={color}
              className={`px-3 py-1 border rounded ${
                selectedColors.includes(color) ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
              onClick={() => handleColorChange(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            value={minPrice}
            onChange={handleMinPriceChange}
            className="border rounded p-1 w-20"
            min="0"
          />
          <span>to</span>
          <input
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="border rounded p-1 w-20"
            min="0"
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Quick Price Filters</h4>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
              onClick={() => applyPriceRange(range.min, range.max)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 