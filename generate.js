import * as bigintCryptoUtils from 'bigint-crypto-utils'

export class Puzzle {
    constructor(u, v, params) {
        this.u = u;
        this.v = v;
        this.params = params;
    }

    add(other) {
        if (this.params !== other.params) {
            throw new Error("puzzle parameters do not match");
        }

        const n2 = this.params.n * this.params.n; // n^2
        const u = (this.u * other.u) % this.params.n;
        const v = (this.v * other.v) % n2;
        return new Puzzle(u, v, this.params);
    }

    solve() {
        const zero = BigInt(0);
        const one = BigInt(1);
        const two = BigInt(2);
        const n2 = this.params.n * this.params.n;

        let w = this.u;
        let i = BigInt(0);

        // w = u^(2*t) mod n
        while (i !== this.params.t) {
            w = bigintCryptoUtils.modPow(w, two, this.params.n)
            i += one;
        }

        // w^n mod n2
        w = bigintCryptoUtils.modPow(w, this.params.n, n2) 

        // w^(-n)
        const wn = bigintCryptoUtils.modInv(w, n2); // Assuming modInverse is implemented

        // v*(w^(-n))
        const vw = this.v * wn;

        const snum = ((vw % n2) - one); // v*(w^(-n)) (mod n^2) - 1
        const s = snum / this.params.n; // s = [ v*(w^(-n)) (mod n^2) - 1 ] / n
        return s;
    }
}
