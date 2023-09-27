import { Parameters } from "./setup.js"

let security_parameter = 256
let T = BigInt(10000000)
let secret = BigInt(123)


const params = Parameters.new(security_parameter, T)
let puzzle = params.generate(secret)
let solution = puzzle.solve()

console.log(solution)