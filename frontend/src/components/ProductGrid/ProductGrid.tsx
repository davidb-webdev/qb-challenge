'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Product } from '@/types/Product'
import ProductCard from './ProductCard'

interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const [loading, setLoading] = useState(true)
  const intersectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  // Infinity scroll pagination
  useEffect(() => {
    // Return early if observer element does not exist, or if already loading
    if (!intersectionRef.current || loading) return

    // Fetch products if user scrolls to observer element
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchProducts(pagination.page + 1)
    })
    intersectionObserver.observe(intersectionRef.current)

    // Clean up observer on unmount
    return () => intersectionObserver.disconnect()
  }, [pagination])

  const fetchProducts = async (page: number = 1, limit: number = 12) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/products?page=${page}&limit=${limit}`)
      const data = await response.json()
      setProducts((prev) => [...prev, ...data.products])
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Do your magic here */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <button
        disabled={!pagination.hasNextPage}
        onClick={() => fetchProducts(pagination.page + 1)}
      >
        Load more
      </button>

      <div ref={intersectionRef}></div>

      {/* This below can be removed */}
      {products.length > 0 && (
        <div className="prose prose-pre:bg-green-100 dark:prose-pre:bg-green-900 prose-pre:text-green-900 dark:prose-pre:text-green-100 mt-8 border-t pt-4">
          <h3 className="text-green-900 dark:text-green-100">
            Data structure <i>(this can be removed)</i>
          </h3>

          <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify([products[0]], null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
