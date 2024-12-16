import { readFile } from '_utils/file'

const DIAGONAL_OFFSET = {
  TOP_RIGHT_TO_BOTTOM_LEFT: [1, 1],
  TOP_LEFT_TO_BOTTOM_RIGHT: [1, -1],
}

/**
 *  get the diagonals in 2 sets
 *
 *  - first set, top-right to bottom-left
 *  .___
 *  |
 *  |
 *  |
 *
 *  - second set, top-left to bottom-right
 *  ___.
 *     |
 *     |
 *     |
 *
 * Use it with the DIAGONAL_OFFSET and get the diagonal as a line
 */
const getDiagonalStarters = (lines) => {
  const firstSet = [
    ...lines.map((v, i) => [i, 0]),
    ...Array.from(lines[0])
      .map((v, j) => [0, j])
      .slice(1),
  ]
  const secondSet = [
    ...lines.map((v, i) => [i, lines[0].length - 1]),
    ...Array.from(lines[0]).slice(1).map((v, j) => [0, j]),
  ]

  return {
    firstSet,
    secondSet,
  }
}

const findWords = (lines, regexpList) => {
  let oc = 0
  for (let i = 0; i < lines.length; i += 1) {
    for (const re of regexpList) {
      const hm = lines[i].match(new RegExp(re, 'g'))
      oc += hm?.length || 0
    }
  }
  
  for (let j = 0; j < lines[0].length; j += 1) {
    let col = ''
    for (let i = 0; i < lines.length; i += 1) {
      col += lines[i].charAt(j)
    }

    for (const re of regexpList) {
      const vm = col.match(new RegExp(re, 'g'))
      oc += vm?.length || 0
    }
  }

  // DIAGONALS
  const { firstSet, secondSet } = getDiagonalStarters(lines)

  const diagonals = []
  for (let singleSet of firstSet) {
    let diagonalLine = ''
    const [a, b] = DIAGONAL_OFFSET.TOP_RIGHT_TO_BOTTOM_LEFT

    let i = singleSet[0]
    let j = singleSet[1]
    while (i < lines.length && j < lines[0].length) {
      diagonalLine += lines[i].charAt(j)
      i += a
      j += b
    }

    if (diagonalLine.length > 3) {
      diagonals.push(diagonalLine)
    }
  }

  for (let singleSet of secondSet) {
    let diagonalLine = ''
    const [a, b] = DIAGONAL_OFFSET.TOP_LEFT_TO_BOTTOM_RIGHT

    let i = singleSet[0]
    let j = singleSet[1]
    while (i < lines.length && j >= 0) {
      diagonalLine += lines[i].charAt(j)
      i += a
      j += b
    }

    if (diagonalLine.length > 3) {
      diagonals.push(diagonalLine)
    }
  }

  for (const dv of diagonals) {
    for (const re of regexpList) {
      const dm = dv.match(new RegExp(re, 'g'))

      oc += dm?.length || 0
    }
  }

  return oc
}

const partTwo = (lines) => {
  let oc = 0

  for (let i = 1; i < lines.length - 1; i += 1) {
    for (let j = 1; j < lines[0].length - 1; j += 1) {
      const c = lines[i].charAt(j)

      if (c === 'A') {
        const d1 = lines[i-1].charAt(j-1) + c + lines[i+1].charAt(j+1)
        const d2 = lines[i-1].charAt(j+1) + c + lines[i+1].charAt(j-1)


        const d1m = d1.match(/(SAM|MAS)/g)
        const d2m = d2.match(/(SAM|MAS)/g)
        if (d1m?.length > 0 && d2m?.length > 0) {
          oc += 1
        }
      }
    }
  }

  return oc
}

const solve = (data) => {
  const lines = data.split('\n').slice(0, -1)
  
  let oc = findWords(lines, ['XMAS', 'SAMX'])

  console.log('> result 1:', oc)

  oc = partTwo(lines)

  console.log('> result 2:', oc)
}

// 7591 - to high

export default function () {
  console.log('--- Day 04: Ceres Search ---')

  const data = readFile('04/input.in')

  return solve(data)
}
