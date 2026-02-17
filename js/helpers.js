export function sumArray(array) {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        let a = +(array[i]);

        if (isNaN(a)) {
            return Number.MIN_VALUE;    // error reading array
        }

        sum += a;
    }

    return sum;
}