export interface GameState {
  generation: number;
  grid: [number, number];
  cells: string[][];
}

/**
 * Create a GameState object with initial values.
 *
 * @param rows Rows of the grid
 * @param cols Columns of the grid
 * @returns
 */
export function createNewGame(rows: number, cols: number): GameState {
  const cells = new Array(rows).fill(null).map(() => new Array(cols).fill("."));
  return {
    generation: 0,
    grid: [rows, cols],
    cells,
  };
}

/**
 * Return a function that update a cell by toggling its value.
 * If the cell is alive it becomes dead, and vice versa.
 *
 * @param row Row of the cell to update
 * @param col Column of the cell to update
 * @returns
 */
export function toggleCellAt(row: number, col: number) {
  return (gameState: GameState): GameState => {
    const cell = gameState.cells[row][col];
    const cells = gameState.cells;
    cells[row][col] = cell === "*" ? "." : "*";

    return {
      ...gameState,
      cells,
    };
  };
}

/**
 * Given the current GameState, run a single generation
 * and return a new GameState.
 *
 * @param state The current GameState
 * @returns
 */
export function nextGeneration(state: GameState): GameState {
  const cells = state.cells.map((row, i) => {
    return row.map((cell, j) => {
      const alives = countAliveNeighbors(state, i, j);
      if (cell === "*") {
        if (alives >= 2 && alives <= 3) {
          return "*";
        }
        return ".";
      } else {
        if (alives === 3) {
          return "*";
        }
        return ".";
      }
    });
  });

  return {
    ...state,
    generation: state.generation + 1,
    cells,
  };
}

/**
 * Count alive neighbors around a given cell.
 *
 * @param param0 GameState
 * @param row row of the cell
 * @param col column of the cell
 * @returns
 */
function countAliveNeighbors(
  { grid, cells }: GameState,
  row: number,
  col: number
): number {
  const startRow = Math.max(row - 1, 0);
  const startCol = Math.max(col - 1, 0);
  const endRow = Math.min(row + 1, grid[0] - 1);
  const endCol = Math.min(col + 1, grid[1] - 1);

  let alive = 0;

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      if (i === row && j === col) {
        continue;
      }

      if (cells[i][j] === "*") {
        alive++;
      }
    }
  }

  return alive;
}
