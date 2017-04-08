/*
  bathroom

  Given a number of stalls N and number of bathroom users K
  return the Max(Ls, Rs) and Min(Ls, Rs) values for the last attendee
  for the stall that they choose.

  Ls is the number of empty stalls from the chosen stall to the left
  Rs is the number of empty stalls from the chosen stall to the right

*/

const fs = require('fs')

const bathroom = (numStalls, users) => {
  const stalls = Array(numStalls)
  let chosenStall // contains index of chosen, plus LS and RS of chosen
  for (var i = 0; i < users; i++) {
    chosenStall = chooseStall(stalls)
    stalls[chosenStall.chosenStall] = true
    console.log(stalls)
  }
  return [chosenStall.Ls, chosenStall.Rs]
}

const chooseStall = (stalls) => {
  // arrays for capturing LS and RS values for each stall.
  const Ls = []
  const Rs = []
  const unoccupiedStack = []

  for (let i = 0; i < stalls.length; i++) {
    if (!stalls[i]) {
      Ls.push(findLs(stalls, i))
      Rs.push(findRs(stalls, i))
      unoccupiedStack.push(i)
    }
  }

  let farthestNeighbor = 0
  let minIndices = [] // best out of unoccupiedStack
  let maximums = [] // second criteria of the indeces above
  for (let i = 0; i < Ls.length; i++) {
    // loop through LS and RS pairs, and track indices where min LS RS is max
    const newFarthestNeighbor = Math.min(Ls[i], Rs[i])
    if (newFarthestNeighbor > farthestNeighbor) {
      farthestNeighbor = newFarthestNeighbor
      minIndices = [unoccupiedStack[i]]
      maximums = [Math.max(Ls[i], Rs[i])]
    } else if (newFarthestNeighbor === farthestNeighbor) {
      minIndices.push(unoccupiedStack[i])
      maximums.push(Math.max(Ls[i], Rs[i]))
    }
  }

  // if there was a clear best stall, return that index
  if (minIndices.length === 1) {
    const unoccupiedStackIndex = unoccupiedStack.indexOf(minIndices[0])
    return {chosenStall: minIndices[0], Ls: Ls[unoccupiedStackIndex], Rs: Rs[unoccupiedStackIndex]}
  }

  // otherwise, go through the maximums to pick the best
  let biggestMax = -1
  let returnIndex
  for (let i = 0; i < maximums.length; i++) {
    if (maximums[i] > biggestMax) {
      returnIndex = i
    }
  }
  console.log('chosen stall is ' + returnIndex)
  const unoccupiedStackIndex = unoccupiedStack.indexOf(returnIndex)
  return {chosenStall: returnIndex, Ls: Ls[unoccupiedStackIndex], Rs: Rs[unoccupiedStackIndex]}
}

const findLs = (stalls, startIndex) => {
  let Ls = 0
  for (let i = startIndex - 1; i >= 0; i--) {
    if (stalls[i]) {
      break
    }
    Ls++
  }
  return Ls
}

const findRs = (stalls, startIndex) => {
  let Rs = 0
  for (let i = startIndex + 1; i < stalls.length; i++) {
    if (stalls[i]) {
      break
    }
    Rs++
  }
  console.log('RS is: ' + Rs)
  return Rs
}

// read file and kick off program
fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }

  const results = data.split('\n')
  const numEntries = parseInt(results.shift())
  for (let i = 0; i < numEntries; i++) {
    const row = results[i].split(' ')
    const returnArray = bathroom(parseInt(row[0]), parseInt(row[1]))
    console.log(`Scenario ${i}: ${returnArray}`)
  }
})
