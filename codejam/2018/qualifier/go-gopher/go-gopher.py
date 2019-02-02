"""
Strategy for this one is to just build a 2xA rectangle.
Since the gopher pseudorandomly assigns values, I want to be able to guarantee
that a random gopher dig will not affect my overall structure. I will build
this 2xA matrix against the top of the 1000x1000 grid, so we are buffered by the top.

We can do this by continuing to assign the gopher to a particular square,
until it pseudo-randomly fills in the square below it. This guarantees that a
random gopher assignment will not require me to build more rows.

Unfortunately this algorithm assumes that the gopher makes mistakes somewhat frequently
and since the gopher only has 1k digs before it gets tired, this might cause
us to run in to that limit.
"""
import sys

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

def is_error_state(x, y):
  return x == -1 and y == -1

def readline_two_int():
  return [x for x in map(int, input().split(' '))]

def last_col(matrix, index):
  return index == len(matrix[0]) - 2

def first_col(index):
  return index == 1

def get_next_coordinate(matrix):
  """
  checks both cells in a column to make sure they are
  filled. if they are not, returns the y_next to send to the gopher
  """
  for y_next in range(1, len(matrix[1]) - 2): #only iterate to second to last col
    if matrix[0][y_next] != 1 or matrix[1][y_next] != 1 or matrix[2][y_next] != 1:
      return y_next
  return y_next

def request_fill(x, y):
  return "{0} {1}".format(str(x + 1), str(y + 1))

def first_finished(matrix):
  """
  true if first two cols are filled
  """
  return matrix[0][0] and matrix[0][1] and matrix[0][2] and matrix[1][0] and matrix[1][1] and matrix[1][2] and matrix[2][0] and matrix[2][1] and matrix[2][2]

if __name__ == "__main__":
  # code for reading from stdin copied from https://code.google.com/codejam/resources/faq
  t = int(input())
  A = int(input())
  eprint('t is {0}'.format(t))
  eprint('A is {0}'.format(A))

  matrix = [
    [0 for _ in range(0, int(A / 2))],
    [0 for _ in range(0, int(A / 2))],
    [0 for _ in range(0, int(A / 2))]
    ] #initializes the 2x(A/2) matrix as zeros
  eprint('matrix is {0}'.format(matrix))

  print(request_fill(2, 2)) # start by requesting (0, 0)
  x, y = readline_two_int() # kick it off!
  y_next = 1
  while x != 0 and y != 0:
    if is_error_state(x, y):
      print ('something went wrong with the gopher...')
      break
    eprint('x and y are {0} {1}'.format(x, y))
    matrix[x - 1][y - 1] = 1 # fill the hole from the previous input

    if first_col(y_next):
      # initial_game. all other cols are filled at this point. just need to
      # continually submit (0, y_next) until everything is filled
      if first_finished(matrix):
        y_next += 1
      else:
        # eprint('at an edge, not yet filled {0}'.format(y_next))
        # eprint(matrix)
        print(request_fill(1, y_next))
    elif last_col(matrix, y_next):
      eprint('at the far {0}'.format(y_next))
      # eprint(matrix)
      eprint('x was {0} y was {1}'.format(x, y))
      print(request_fill(1, y_next))
    else:
      eprint('y_next is {0}'.format(y_next))
      y_next = get_next_coordinate(matrix)
      print(request_fill(1, y_next))
    x, y = readline_two_int()

  # both are 0, should be good to exit
