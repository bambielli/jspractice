"""
An alien robot is threatening the universe, using a beam that will destroy all algorithms knowledge. We have to stop it!

Fortunately, we understand how the robot works. It starts off with a beam with a strength of 1, and it will run a program that is a series of instructions, which will be executed one at a time, in left to right order. Each instruction is of one of the following two types:

C (for "charge"): Double the beam's strength.
S (for "shoot"): Shoot the beam, doing damage equal to the beam's current strength.
For example, if the robot's program is SCCSSC, the robot will do the following when the program runs:

Shoot the beam, doing 1 damage.
Charge the beam, doubling the beam's strength to 2.
Charge the beam, doubling the beam's strength to 4.
Shoot the beam, doing 4 damage.
Shoot the beam, doing 4 damage.
Charge the beam, increasing the beam's strength to 8.
In that case, the program would do a total of 9 damage.

The universe's top algorithmists have developed a shield that can withstand a maximum total of D damage. But the robot's current program might do more damage than that when it runs.

The President of the Universe has volunteered to fly into space to hack the robot's program before the robot runs it. The only way the President can hack (without the robot noticing) is by swapping two adjacent instructions. For example, the President could hack the above program once by swapping the third and fourth instructions to make it SCSCSC. This would reduce the total damage to 7. Then, for example, the president could hack the program again to make it SCSSCC, reducing the damage to 5, and so on.

To prevent the robot from getting too suspicious, the President does not want to hack too many times. What is this smallest possible number of hacks which will ensure that the program does no more than D total damage, if it is possible to do so?

Input
The first line of the input gives the number of test cases, T. T test cases follow. Each consists of one line containing an integer D and a string P: the maximum total damage our shield can withstand, and the robot's program.

Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is either the minimum number of hacks needed to accomplish the goal, or IMPOSSIBLE if it is not possible.

Limits
1 ≤ T ≤ 100.
1 ≤ D ≤ 109.
2 ≤ length of P ≤ 30.
Every character in P is either C or S.
Time limit: 20 seconds per test set.
Memory limit: 1GB.

Test set 1 (Visible)
The robot's program contains either zero or one C characters.

Test set 2 (Hidden)
No additional restrictions to the Limits section.
"""


def output_case_number(case_number, num_hacks):
  """
  @param case_number: String
  @param num_hacks: String

  @return: String
  """
  return "Case #{0}: {1}".format(case_number, num_hacks)

def impossible_check(shield_value, sequence):
  """
  @param shield_value: integer
  @param sequence: String

  @return: bool

  Counts number of S values in the sequence. If it is greater than the shield_value,
  no number of re-ordering will save the universe :(
  """
  return shield_value < sequence.count('S')

def process_sequence(sequence):
  """
  @param sequence: String
  @return: [[char, power_level]]
  """
  power_level = 1
  processed_sequence = []
  for char in sequence:
    if char == 'C':
      power_level *= 2
    processed_sequence.append([char, power_level])
  return processed_sequence

def damage_from_sequence(processed_sequence):
  """
  @param processed_sequence: [[char, power_level]]
  @return: integer (total_damage)
  """
  return sum([power_level for [char, power_level] in processed_sequence if char != 'C'])

def perform_best_swap(processed_sequence):
  """
  @param processed_sequence: [[char, power_level]]
  mutates the passed sequence, making the best swap
  @return: None
  """
  # iterate backwards until you see an S
  # the next C you see is the best to swap
  best_swap_index = None #this is the index of the best C to swap
  s_found = False
  for i, [char, _] in reversed(list(enumerate(processed_sequence))):
    if char == 'C' and s_found:
      best_swap_index = i
      break
    elif char == 'S':
      s_found = True

  # if this was found, we have found something to swap
  if best_swap_index != None:
    processed_sequence[best_swap_index], processed_sequence[best_swap_index + 1] = processed_sequence[best_swap_index + 1], processed_sequence[best_swap_index]
    # reduce the power level of the S value that was swapped
    processed_sequence[best_swap_index][1] = processed_sequence[best_swap_index][1] / 2

def save_the_universe(shield_value, sequence=''):
  """
  @param shield_value: integer
  @param sequence: String

  @return: String
  """
  if impossible_check(shield_value, sequence):
    return 'IMPOSSIBLE'
  elif sequence == '':
    return 0
  else:
    # to reduce damage, we should ALWAYS perform the highest reduction swap possible
    # this is a swap of the farthest C to the right in the sequence, that is NOT adjacent to another C
    # or is a the end of the string.
    processed_sequence = process_sequence(sequence)
    damage = damage_from_sequence(processed_sequence)
    hacks = 0
    while shield_value <  damage:
      perform_best_swap(processed_sequence)
      hacks += 1
      damage = damage_from_sequence(processed_sequence)
    return str(hacks)


if __name__ == "__main__":
  # code for reading from stdin copied from https://code.google.com/codejam/resources/faq
  t = int(input()) # read a line with a single integer (to start)
  for case_number in range(1, t + 1):
    shield_value, sequence = input().split(' ')
    num_hacks = save_the_universe(int(shield_value), sequence)
    print (output_case_number(str(case_number), num_hacks))