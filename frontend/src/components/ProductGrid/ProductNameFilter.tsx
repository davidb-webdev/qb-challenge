interface ProductNameFilterProps {
  nameFilter: string
  setNameFilter: (_value: string) => void
}

export default function ProductNameFilter({
  nameFilter,
  setNameFilter,
}: ProductNameFilterProps) {
  return (
    <div className="flex gap-3 items-center relative">
      <label
        htmlFor="productNameFilter"
        className={
          'absolute text-black p-3' +
          (nameFilter.length > 0 ? ' sr-only' : '')
        }
      >
        Product name
      </label>
      <input
        id="productNameFilter"
        type="search"
        value={nameFilter}
        onChange={(event) => setNameFilter(event.target.value)}
        className="rounded-3xl text-black px-3 py-1 border-2 outline-none focus:border-blurple transition-colors duration-150"
      />
    </div>
  )
}
