import { readFile } from '_utils/file'

const solve = (data) => {
  const lines = data.split('\n').slice(0, -1)

  const l1 = [],
    l2 = []

  for (const line of lines) {
    const [x, y] = line.match(/\d+/g).map((v) => Number(v))

    l1.push(x)
    l2.push(y)
  }

  l1.sort((a, b) => a - b)
  l2.sort((a, b) => a - b)

  let diff = 0
  for (let i = 0; i < lines.length; i += 1) {
    diff += Math.abs(l1[i] - l2[i])
  }

  console.log('> result 1:', diff)

  let score = 0
  for (const v of l1) {
    const ls = l2.filter((u) => u === v).length
    score += ls * v
  }

  console.log('> result 2:', score)
}

export default function () {
  console.log('--- Day 01: Historian Hysteria ---')

  const data = readFile('01/input.in')

  return solve(data)
}
