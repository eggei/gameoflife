// run "live-server" command in this directory to see what happens in the browser

const make2DArray = (cols, rows) => {
  const arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr
};

let grid;
let cols = 10;
let rows = 10;
let resolution = 5;

function setup() {
  createCanvas(640, 300);
  cols = ceil(width / resolution);
  rows = ceil(height / resolution);

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
};

function draw() {
  background(0)

  let next = make2DArray(cols, rows)

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j]
    
      // Count live nighbors
      let sum = 0
      let neighbors = countNeigbors(grid, i, j)


      if (state === 0 && neighbors === 3){
        next[i][j] = 1
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state
      }
    }
  }


  grid = next

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution
      let y = j * resolution

      if(grid[i][j] == 1) {
        fill(150,20,200)
        stroke(0)
        ellipse(x, y, resolution, resolution)
      }
    }
  }


}

function countNeigbors(grid, x, y) {
  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols
      let row = (y + j + rows) % rows
      
      sum += grid[col][row]
    }
  }
  sum -= grid[x][y]
  return sum
}