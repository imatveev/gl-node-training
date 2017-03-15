'use strict';

process.on('message', message => {
    let { max, min } = message;
    if (max < min) {
        process.send({ error: "Incorrect range" });
        process.exit(0);
    }

    let primes = [];

    for (let i = 0; i <= max; i++) {
        primes[i] = 0;
    }

    for (let i = 3; i * i <= max; i++) {
        for (let j = i + i; j <= max; j = j + i) {
            primes[j] = 1;
        }
    }

    min = min % 2 === 0 ? min + 1 : min;
    for (let i = min; i <= max; i += 2) {
        if (!primes[i]) {
            process.send({ primeNumber: i });
            process.exit(0);
        }
    }

    process.send({ error: "Prime number is not found for this range" });
    process.exit(0);
});
