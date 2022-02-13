interface Props {
  cells: string[][];
  toggleCell: (row: number, col: number) => void
}

function GameGrid({ cells, toggleCell }: Props) {
  return <div className="game-content">
    {cells.map((row, i) => {
      return <div className="game-row" key={'row-' + i}>
        {row.map((cell, j) => {
          return <div key={'cell-' + j}
            className={cell === '*' ? 'game-cell game-cell--alive' : "game-cell game-cell--dead"}
            onClick={() => toggleCell(i, j)}></div>
        })}
      </div>
    })}
  </div>
}

export default GameGrid;