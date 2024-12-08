import { readFile } from '_utils/file'

const partOne = (data) => {
  const matches = data.match(/mul\(\d+,\d+\)/g)

  let sum = 0
  for (const m of matches) {
    const [v1, v2] = m.match(/\d+/g).map((v) => Number(v))

    sum += v1 * v2
  }

  return sum
}

const partTwo = (data) => {
  const matches = data.match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)

  let sum = 0
  let doMul = true
  for (const m of matches) {
    const [doOrDont] = m.match(/do\(\)|don't\(\)/) || [false]

    if (doOrDont) {
      doMul = doOrDont === 'do()'
    } else {
      if (doMul) {
        const [v1, v2] = m.match(/\d+/g).map((v) => Number(v))

        sum += v1 * v2
      }
    }
  }

  return sum
}

const solve = (data) => {
  const partOneSum = partOne(data)

  console.log('> result 1:', partOneSum)

  const partTwoSum = partTwo(data)

  console.log('> result 2:', partTwoSum)
}

export default function () {
  console.log('--- Day 03: Mull It Over ---')

  const data = readFile('03/input.in')

  return solve(data)
}
