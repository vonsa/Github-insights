/**
 * Running the returned function will test the next item in the array
 * When all items in the array have been tested, the done function will be called
 * @param {Array} expected Any number of expected outcomes, in order
 * @returns {(args) => void} Test the next result v.s. args
 */
export function createNextableExpect(expected: any[], done: jest.DoneCallback) {
  function test(yielded: any, expected: any, complete: boolean) {
    expect(yielded).toEqual(expected)
    if (complete) {
      done()
    }
  }

  function* testNexted(): any {
    for (const [index, value] of expected.entries()) {
      test(yield, value, index === expected.length - 1)
    }
  }

  const nextable = testNexted()
  nextable.next()

  return (...args: any[]) => nextable.next(...args)
}
