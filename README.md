# jshtlp
Javascript implementation of the paper ["Homomorphic Time-Lock Puzzles and Applications"](https://eprint.iacr.org/2019/635.pdf)


You can find the C implementation at https://github.com/verifiable-timed-signatures/liblhtlp

## Dependencies:
"bigint-crypto-utils": "^3.3.0"

## Example usage
You can check the main.js for example usage

```javascript
//Creating new parameters with selected security parameter and the time value
const params = Parameters.new(security_parameter, T)

//Creating puzzle with the desired secret
let puzzle = params.generate(secret)

//Solving the puzzle (Reminder: it cannot be opened until the given time parameter T)
let solution = puzzle.solve()

```


