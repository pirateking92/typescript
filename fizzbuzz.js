"use strict";
// Loop through numbers 1 to 100 (generally speaking on the upper limit)
// Print the word “Fizz” if the number is divisible by 3
// Print the word “Buzz” if the number is divisible by 5
// Subsequently print “FizzBuzz” if the number is divisible by 3 and 5
// Otherwise, just print out the current number
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
r1.question("Please enter a number to fizzbuzz up to: ", function (input) {
    var num = parseInt(input);
    fizzbuzz(num);
    r1.close();
});
function fizzbuzz(n) {
    if (n == 0) {
        return 0;
    }
    if (n % 3 == 0 && n % 5 == 0) {
        return "fizzbuzz";
    }
    if (n % 3 == 0) {
        return "fizz";
    }
    if (n % 5 == 0) {
        return "buzz";
    }
    console.log(n);
}
