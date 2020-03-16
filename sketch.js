// run "live-server" command in this directory to see what happens in the browser

let grid
let cols = 10
let rows = 10
let resolution = 20

function setup() {
    createCanvas(600, 600)
    frameRate(10)
    cols = ceil(width / resolution)
    rows = ceil(height / resolution)
    grid = makeGrid(cols, rows)
    noLoop()
}

function draw() {
    background(0)
    if (grid[0][0].isAlive()) {
        grid[0][0].kill()
    } else {
        grid[0][0].vitalize()
    }
    // console.log(c)
    // for (let i = 0; i < cols; i++) {
    //     for (let j = 0; j < rows; j++) {
    //         let x = i * resolution + resolution / 2
    //         let y = j * resolution + resolution / 2
    //         const curr = grid[i][j]
    //         fill(curr.getColor())
    //         ellipse(x, y, resolution, resolution)
    //     }
    // }
    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution+ resolution/2
        let y = j * resolution+ resolution/2
        const cell = grid[i][j]
        // Count live nighbors
        let neighbors = countNeigbors(grid, i, j)
        console.log('cell' + i + j)
        if (!cell.isAlive() && neighbors === 3){
          cell.kill()
        } else if (cell.isAlive() && (neighbors < 2 || neighbors > 3)) {
          console.log(neighbors)
          cell.vitalize();
        }

        fill(cell.getColor())
        ellipse(x, y, resolution, resolution)
      }
    }
}

function countNeigbors(grid, x, y) {
    let sum = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols
            let row = (y + j + rows) % rows

            sum += grid[row][col].isAlive() ? 1 : 0
        }
    }
    sum -= 1
    return sum
}

function makeGrid(cols, rows) {
    return [...new Array(cols)].map(_ =>
        [...new Array(rows)].map(_ => new Cell())
    )
}

class Cell {
    constructor(id) {
        this.state = Math.floor(Math.random() * 2)
        // this.id = id
        this.initialColor = this.randomColor(50)
        this.color = '#000'
        // console.log(this.state)
    }
    getState() {
        return this.state
    }

    kill() {
        this.state = 0
        this.color = '#000'
    }

    vitalize() {
        this.state = 1
        this.color = this.initialColor
    }

    getColor() {
        return this.color
    }

    setColor(color) {
      this.color = color
    }

    isAlive() {
        return this.state > 0
    }

    randomColor(brightness) {
        function randomChannel(brightness) {
            var r = 255 - brightness
            var n = 0 | (Math.random() * r + brightness)
            var s = n.toString(16)
            return s.length == 1 ? '0' + s : s
        }
        return (
            '#' +
            randomChannel(brightness) +
            randomChannel(brightness) +
            randomChannel(brightness)
        )
    }
}
