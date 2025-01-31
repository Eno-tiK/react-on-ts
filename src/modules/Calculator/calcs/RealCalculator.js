class RealCalculator {
    add(a, b) { return a + b }
    sub(a, b) { return a - b }
    mult(a, b) { return a * b }
    div(a, b) { return b !== 0 ? a / b : 'error' }
    pow(a, b) { return Math.pow(a, b) }
    prod(a, p) { return a * p }
    zero() { return 0 }
    one() { return 1 }
}

export default RealCalculator;