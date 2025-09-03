'use client'

import { useEffect, useRef, useState } from 'react'
import { Product } from '@/types/Product'
import ProductCard from './ProductCard'
import ListOptions from './ListOptions'
import ProductNameFilter from './ProductNameFilter'

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
  const [error, setError] = useState(false)
  const [displayAsGrid, setDisplayAsGrid] = useState(true)
  const [nameFilter, setNameFilter] = useState<string>('')

  const observerElementRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Initial load
  useEffect(() => {
    fetchProducts()
  }, [])

  // Infinity scroll pagination
  useEffect(() => {
    // Return early if...
    if (
      !observerElementRef.current ||
      loading ||
      error ||
      !pagination.hasNextPage
    )
      return

    // Fetch products if user scrolls to observer element
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchProducts(pagination.page + 1)
      },
      { rootMargin: '300px 0px' },
    )

    intersectionObserver.observe(observerElementRef.current)
    observerRef.current = intersectionObserver

    // Clean up observer on unmount
    return () => intersectionObserver.disconnect()
  }, [pagination, loading, error])

  const fetchProducts = async (page: number = 1, limit: number = 12) => {
    setLoading(true)
    // Pause observer while loading
    if (observerRef.current && observerElementRef.current) {
      observerRef.current.unobserve(observerElementRef.current)
    }

    try {
      const response = await fetch(`/api/products?page=${page}&limit=${limit}`)
      const data = await response.json()
      setProducts((prev) => [...prev, ...data.products])
      setPagination(data.pagination)
      setError(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts =
    nameFilter !== ''
      ? products.filter((product) =>
          product.name.toLowerCase().includes(nameFilter.toLowerCase()),
        )
      : products

  return (
    <>
      <section className="flex gap-3 justify-between items-center pb-3">
        <ProductNameFilter
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
        />
        <ListOptions
          displayAsGrid={displayAsGrid}
          setDisplayAsGrid={setDisplayAsGrid}
        />
      </section>

      <section>
        <div
          className={
            'grid gap-3' +
            (displayAsGrid
              ? ' grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]'
              : ' grid-cols-1')
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              displayAsGrid={displayAsGrid}
            />
          ))}
        </div>

        {error && (
          <div className="p-5 text-center">
            <p>Couldn't load products</p>
            <button
              onClick={() => fetchProducts(pagination.page + 1)}
              className="mt-3 p-3 px-5 bg-blue-950 hover:bg-blurple rounded-xl"
            >
              Retry
            </button>
          </div>
        )}

        {loading && (
          <p className="text-center p-3">Fetching more products&hellip;</p>
        )}

        {!pagination.hasNextPage && !loading && !error && (
          <p className="p-5 text-center">Displaying all products</p>
        )}
      </section>

      <div ref={observerElementRef}></div>
    </>
  )
}
