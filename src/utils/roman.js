const NUMERALS = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

// Uppercase Roman numeral for a positive integer: 4 -> "IV".
// Used for editorial numbering only, never for technical values.
export function toRoman(value) {
  let rest = value
  let result = ''
  for (const [amount, numeral] of NUMERALS) {
    while (rest >= amount) {
      result += numeral
      rest -= amount
    }
  }
  return result
}
