/*
  pancakes
  minimum number of flips to get all pancakes to be + side up.
  can only flip top n at a time
  implement using a stack.
  O(n) runtime.
  O(n) space.
*/
var fileReader = require('filereader')
var fileApi = require('file-api')
var File = fileApi.File
var reader = new fileReader()

function pancakes (testCase, n) {
  var arr = n.split('')
  var count = 0
  var flip = false
  while (arr.length > 0) {
    var current = arr.pop()
    if (current === '-' && !flip) {
      count++
      flip = true
    } else if (current === '+' && flip) {
      count++
      flip = false
    }
  }
  console.log('Case #' + testCase + ': ' + count)
}

reader.onload = function (e) {
  var result = reader.result.split('\n')
  result.pop()
  result.shift()
  for (var i = 0; i < result.length; i++) {
    pancakes(i + 1, result[i])
  }
}

reader.readAsText(new File('B-large.txt'))

