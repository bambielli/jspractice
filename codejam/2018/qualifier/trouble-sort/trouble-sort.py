"""
Deep in Code Jam's secret algorithm labs, we devote countless hours to wrestling with one of the most complex problems of our time: efficiently sorting a list of integers into non-decreasing order. We have taken a careful look at the classic bubble sort algorithm, and we are pleased to announce a new variant.

The basic operation of the standard bubble sort algorithm is to examine a pair of adjacent numbers, and reverse that pair if the left number is larger than the right number. But our algorithm examines a group of three adjacent numbers, and if the leftmost number is larger than the rightmost number, it reverses that entire group. Because our algorithm is a "triplet bubble sort", we have named it Trouble Sort for short.

  TroubleSort(L): // L is a 0-indexed list of integers
    let done := false
    while not done:
      done = true
      for i := 0; i < len(L)-2; i++:
        if L[i] > L[i+2]:
          done = false
          reverse the sublist from L[i] to L[i+2], inclusive
For example, for L = 5 6 6 4 3, Trouble Sort would proceed as follows:

First pass:
inspect 5 6 6, do nothing: 5 6 6 4 3
inspect 6 6 4, see that 6 > 4, reverse the triplet: 5 4 6 6 3
inspect 6 6 3, see that 6 > 3, reverse the triplet: 5 4 3 6 6
Second pass:
inspect 5 4 3, see that 5 > 3, reverse the triplet: 3 4 5 6 6
inspect 4 5 6, do nothing: 3 4 5 6 6
inspect 5 6 6, do nothing: 3 4 5 6 6
Then the third pass inspects the three triplets and does nothing, so the algorithm terminates.
We were looking forward to presenting Trouble Sort at the Special Interest Group in Sorting conference in Hawaii, but one of our interns has just pointed out a problem: it is possible that Trouble Sort does not correctly sort the list! Consider the list 8 9 7, for example.

We need your help with some further research. Given a list of N integers, determine whether Trouble Sort will successfully sort the list into non-decreasing order. If it will not, find the index (counting starting from 0) of the first sorting error after the algorithm has finished: that is, the first value that is larger than the value that comes directly after it when the algorithm is done.

Input
The first line of the input gives the number of test cases, T. T test cases follow. Each test case consists of two lines: one line with an integer N, the number of values in the list, and then another line with N integers Vi, the list of values.

Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is OK if Trouble Sort correctly sorts the list, or the index (counting starting from 0) of the first sorting error, as described above.

Limits
1 ≤ T ≤ 100.
0 ≤ Vi ≤ 109, for all i.
Memory limit: 1GB.

Test set 1 (Visible)
3 ≤ N ≤ 100.
Time limit (for the entire test set): 10 seconds.

Test set 2 (Hidden)
3 ≤ N ≤ 105.
Time limit (for the entire test set): 20 seconds.

Special Note
Notice that test set 2 for this problem has a large amount of input, so using a non-buffered reader might lead to slower input reading. In addition, keep in mind that certain languages have a small input buffer size by default.
"""

def output_case_number(case_number, index):
  """
  @param case_number: String
  @param index: String

  @return: String
  """
  return "Case #{0}: {1}".format(case_number, index)


def trouble_sort(sequence):
  done = False
  while not done:
    done = True
    for i in range(0, len(sequence) - 2):
      if sequence[i] > sequence[i + 2]:
        done = False
        sequence[i], sequence[i + 2] = sequence[i + 2], sequence[i]

def eval_trouble_sort(sequence):
  """
  @param sequence: [1, 2, 3]
  @preturn: String
  """
  trouble_sort(sequence) # mutates the original sequence
  first_bad_index = "OK" # default is that array is OK
  for index in range(0, len(sequence) - 1): # go to -1 so we don't index out of bounds with comparison
    if not sequence[index] <= sequence[index + 1]:
      # the first time the order is not preserved, break
      first_bad_index = str(index)
      break

  return first_bad_index


if __name__ == "__main__":
  # code for reading from stdin copied from https://code.google.com/codejam/resources/faq
  number_of_cases = int(input()) # read a line with a single integer (to start)
  for case_number in range(1, number_of_cases + 1):
    length_of_sequence = int(input())
    sequence = [x for x in map(int, input().split(' '))]
    index = eval_trouble_sort(sequence)
    print (output_case_number(str(case_number), index))
