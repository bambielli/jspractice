/*
  tidy numbers

  given a number n,
  find the largest number less than or equal to N that is "tidy."

  A tidy number is an integer, when written in base 10 with no leading zeroes,
  that has its digits sorted in non-decreasing order.
  Some examples of this are 8, 123, 555, and 224488

*/
const fr = require('filereader')
const fapi = require('file-api')
const fs = require('fs')
const File = fapi.File
const reader = new fr()

const tidy = (n) => {
  // start at beginning of number. pull first two digits.
  if (n.length === 1) {
    return n
  }

  let pointer = n.length - 1
  let sub1 = false
  let resultArray = []

  // else
  // start at end of number

  while (pointer !== 0) {
    let lastDigit = n[pointer]
    const compareTo = n[pointer - 1]
    // if in the last iteration, we needed to subtract 1 from the compareTo
    // subtract 1 here.
    if (sub1) {
      lastDigit = (parseInt(lastDigit) - 1).toString()
      sub1 = false
    }
    // if number is less than number to left,
    if (lastDigit < compareTo) {
      resultArray.unshift('9')
      sub1 = true
    } else {
      resultArray.unshift(lastDigit)
    }
    pointer--
  }
  let lastDigit = n[0]

  if (sub1) {
    lastDigit = parseInt(lastDigit) - 1
    resultArray = resultArray.map(() => { return '9' })
  }

  if (lastDigit !== 0) {
    resultArray.unshift(lastDigit)
  }

  return resultArray.join('')
}

const generateNinesString = (len) => {
  return Array(len).join('9')
}

reader.onload = (e) => {
  const result = reader.result.split('\n')
  const numEntries = parseInt(result.shift())
  for (let i = 0; i < numEntries; i++) {
    fs.appendFileSync('output.txt', `Case #${i + 1}: ${tidy(result[i])}\n`)
  }
}

reader.readAsText(new File('B-small-attempt1.in'))
