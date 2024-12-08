import { readFile } from '_utils/file'

const GROWTH = {
  increase: 'inc',
  decrease: 'dec',
}

const THRESHOLD = 3

const checkLine = (lv) => {
  const growth = lv[0] > lv[lv.length - 1] ? GROWTH.decrease : GROWTH.increase

  for (let i = 0; i < lv.length - 1; i += 1) {
    const actual = lv[i]
    const next = lv[i + 1]
    if (actual === next) {
      return false
    }

    if (growth === GROWTH.decrease) {
      if (actual < next || actual - next > THRESHOLD) {
        return false
      }
    }
    if (growth === GROWTH.increase) {
      if (actual > next || next - actual > THRESHOLD) {
        return false
      }
    }
  }

  return true
}

const partOne = (lines) => {
  const safeLines = []
  for (const line of lines) {
    const lv = line.match(/\d+/g).map((v) => Number(v))

    if (checkLine(lv)) safeLines.push(lv)
  }

  return safeLines.length
}

const partTwo = (lines) => {
  const safeLines = []
  for (const line of lines) {
    const lv = line.match(/\d+/g).map((v) => Number(v))

    if (checkLine(lv)) {
      safeLines.push(lv)
      continue
    }

    for (let i = 0; i < lv.length; i += 1) {
      const actual = [...lv.slice(0, i), ...lv.slice(i + 1)]

      if (checkLine(actual)) {
        safeLines.push(lv)
        break
      }
    }
  }

  return safeLines.length
}

const solve = (data) => {
  const lines = data.split('\n').slice(0, -1)

  const resultOne = partOne(lines)

  console.log('> result 1:', resultOne)

  const resultTwo = partTwo(lines)

  console.log('> result 2:', resultTwo)
}

export default function () {
  console.log('--- Day 02: Red-Nosed Reports ---')

  const data = readFile('02/input.in')

  return solve(data)
}
