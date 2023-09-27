// Note: The `rand` crate usage is replaced with JavaScript's built-in `Math.random()`.
// The `num_primes` crate usage is replaced with a custom implementation using BigInt.

import crypto from "crypto"
import { Puzzle } from "./generate.js";
import * as bigintCryptoUtils from 'bigint-crypto-utils'

export class Parameters {
    constructor(t, n, g, h) {
        this.t = t;
        this.n = n;
        this.g = g;
        this.h = h;
    }

    static new(security, t) {
        const one = BigInt(1);
        const two = BigInt(2);

        const p = crypto.generatePrimeSync(security, {bigint: true, safe: true});
        const q = crypto.generatePrimeSync(security, {bigint: true, safe: true});
        const n = p * q;

        let gTilda = generateRandomBigInt(one, n - one)
        let g = bigintCryptoUtils.modPow(gTilda, two, n) 
        g = (n - g) % n
        const phiN = (p - one) * (q - one);
        const twoT = bigintCryptoUtils.modPow(two, t, (phiN/two)) 
        const h = bigintCryptoUtils.modPow(g, twoT, n)

        return new Parameters(t, n, g, h);
    }

    generate = function (s) {
        const one = BigInt(1);
    
        const n2 = this.n * this.n; // n^2
        const r = generateRandomBigInt(one, n2 - one)
        const u = bigintCryptoUtils.modPow(this.g, r, this.n)
    
        const rn = r * this.n; // r*n
        const hrn = bigintCryptoUtils.modPow(this.h, rn, n2)
        const ns = bigintCryptoUtils.modPow(this.n + one, s, n2) 
        const v = (hrn * ns) % n2;
    
        return new Puzzle(u, v, this);
    };
}

function generateRandomBigInt(low_big_int, high_big_int) {
    if (low_big_int >= high_big_int) {
      throw new Error('low_big_int must be smaller than high_big_int');
    }
  
    const difference = high_big_int - low_big_int;
    const difference_length = difference.toString().length;
    let multiplier = '';
    while (multiplier.length < difference_length) {
      multiplier += Math.random()
        .toString()
        .split('.')[1];
    }
    multiplier = multiplier.slice(0, difference_length);
    const divisor = '1' + '0'.repeat(difference_length);
  
    const random_difference = (difference * BigInt(multiplier)) / BigInt(divisor);
  
    return low_big_int + random_difference;
  }