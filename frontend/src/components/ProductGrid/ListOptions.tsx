interface ListOptionsProps {
  displayAsGrid: boolean
  setDisplayAsGrid: (_value: boolean) => void
}

export default function ListOptions({
  displayAsGrid,
  setDisplayAsGrid,
}: ListOptionsProps) {
  const buttons = [
    { label: 'Grid', value: true },
    { label: 'List', value: false },
  ]

  return (
    <div className="flex gap-3 items-center">
      <p>Display as:</p>

      {buttons.map((button) => {
        const active = displayAsGrid === button.value
        return (
          <button
            key={button.label}
            disabled={active}
            onClick={() => setDisplayAsGrid(!displayAsGrid)}
            className={
              'transition-colors duration-150 enabled:hover:text-blue-200' +
              (active ? ' text-blurple' : '')
            }
          >
            {button.label}
          </button>
        )
      })}
    </div>
  )
}
