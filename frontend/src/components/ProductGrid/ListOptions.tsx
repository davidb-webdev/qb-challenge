interface ListOptionsProps {
  displayAsGrid: boolean
  setDisplayAsGrid: (_value: boolean) => void
}

export default function ListOptions({
  displayAsGrid,
  setDisplayAsGrid,
}: ListOptionsProps) {
  return (
    <div className="flex gap-3 justify-end p-3">
      <p>Display as:</p>

      <button
        disabled={displayAsGrid}
        onClick={() => setDisplayAsGrid(true)}
        className={displayAsGrid ? 'text-blue-500' : ''}
      >
        Grid
      </button>

      <button
        disabled={!displayAsGrid}
        onClick={() => setDisplayAsGrid(false)}
        className={!displayAsGrid ? 'text-blue-500' : ''}
      >
        List
      </button>
    </div>
  )
}
