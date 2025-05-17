'use client'

import { useEffect, useState } from 'react'
import ProductList from '@/components/ProductList'
import ProductFilters from '@/components/ProductFilters'

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    colors: [],
    minPrice: 0,
    maxPrice: 1000,
    searchTerm: '',
  })

  const handleFilterChange = (selectedColors: string[], minPrice: number, maxPrice: number, searchTerm: string) => {
    setFilters({
      colors: selectedColors,
      minPrice,
      maxPrice,
      searchTerm,
    })
  }

  return (
    <div className="flex flex-col h-[100vh]">
      
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto py-12">
          <hgroup className='font-mono space-y-3'>
            <h1 className="text-3xl font-bold">QualityCode.biz</h1>
            <p>Honestly, it's amazing we're still in business<span>™</span></p>
          </hgroup>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-scroll">
      <div className="container mx-auto py-12 flex flex-col flex-1 gap-6 overflow-y-scroll">
        <h1 className="text-3xl font-bold">Our products</h1>
        <p className="text-red-500 font-bold">Deal alert! 25% off all items over $500.</p>
        <div className="block">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>
        
        <ProductList
          selectedColors={filters.colors} 
          minPrice={filters.minPrice} 
          maxPrice={filters.maxPrice}
          searchTerm={filters.searchTerm} 
        />
      </div>
      </div>

      <div className="bg-gray-100 border-t">
        <div className="container mx-auto py-4">
            <p className='text-gray-600'>Scraping by since 1992</p>
        </div>
      </div>
    </div>
  )
} 