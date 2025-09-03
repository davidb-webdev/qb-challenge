interface ProductNameFilterProps {
  nameFilter: string
  setNameFilter: (_value: string) => void
}

export default function ProductNameFilter({
  nameFilter,
  setNameFilter,
}: ProductNameFilterProps) {
  return (
    <div className="flex gap-3 items-center">
      <label htmlFor="productNameFilter">Filter product name:</label>
      <input
				id="productNameFilter"
        type="search"
        value={nameFilter}
        onChange={(event) => setNameFilter(event.target.value)}
        className="rounded-lg text-black px-2 border-2 outline-none focus:border-blurple font-bold transition-colors"
      />
    </div>
  )
}
