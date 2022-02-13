import { download } from "../utils/files";
import { GameState } from "./game";

/**
 * Parse the content of a file to load a GameState.
 * If the file is not in the expected format an
 * error will be thrown.
 *
 * @param content Content of the file.
 * @returns
 */
export function parseContent(content: string): GameState {
  const lines = content.split("\n");
  if (lines.length <= 2) {
    throwBadFormat();
  }

  const generationLine = lines[0];
  const gridLine = lines[1];
  const cellLines = lines.slice(2);

  const generation = parseGeneration(generationLine);
  const grid = parseGrid(gridLine);
  const cells = parseCells(grid, cellLines);

  return { generation, grid, cells };
}

/**
 * Save a GameState to a text file and download it.
 * @param game
 */
export function saveGame(game: GameState) {
  const cells = game.cells.map((row) => row.join(" ")).join("\n");
  const text = `Generation ${game.generation}:
${game.grid[0]} ${game.grid[1]}
${cells}`;

  download(text, "game.txt");
}

function parseGeneration(generationLine: string): number {
  if (!generationLine.startsWith("Generation ")) {
    throwBadFormat();
  }

  return parseInt(generationLine.replace("Generation ", "").replace(":", ""));
}

function parseGrid(gridLine: string): [number, number] {
  const gridNumbers = gridLine.split(" ");

  if (gridNumbers.length !== 2) {
    throwBadFormat();
  }

  const rows = parseInt(gridNumbers[0]);
  const cols = parseInt(gridNumbers[1]);

  return [rows, cols];
}

function parseCells(grid: [number, number], cellLines: string[]) {
  const [rows, cols] = grid;
  if (cellLines.length !== rows) {
    throwBadFormat();
  }

  return cellLines.map((cellLine) => {
    const cells = cellLine.split(" ");

    if (cells.length !== cols) {
      throwBadFormat();
    }

    return cells;
  });
}

function parseInt(value: string): number {
  try {
    return Number.parseInt(value.trim());
  } catch {
    throwBadFormat();
  }
}

function throwBadFormat(): never {
  throw Error("File content bad format");
}
