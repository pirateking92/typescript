
// Loop through numbers 1 to 100 (generally speaking on the upper limit)
// Print the word “Fizz” if the number is divisible by 3
// Print the word “Buzz” if the number is divisible by 5
// Subsequently print “FizzBuzz” if the number is divisible by 3 and 5
// Otherwise, just print out the current number

import * as readline from 'readline'

let r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

r1.question('Please enter a number to fizzbuzz: ', (input) => {
    let num = parseInt(input);
    fizzbuzz(num)
    r1.close();
});

function fizzbuzz(n: number): void {
    let divBy3: boolean;
    let divBy5: boolean;
    let i: number;
    let output: string;

    for (i = 1; i <= 100; i += 1) {
        output = ''
        divBy3 = !(i % 3)
        divBy5 = !(i % 5)

        if (divBy3) output += 'Fizz'
        if (divBy5) output += 'Buzz'
        if (!(divBy3) || divBy5) output = i.toString()

        console.log(output)
}
}