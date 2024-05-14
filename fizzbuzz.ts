// Loop through numbers 1 to 100 (generally speaking on the upper limit)
// Print the word “Fizz” if the number is divisible by 3
// Print the word “Buzz” if the number is divisible by 5
// Subsequently print “FizzBuzz” if the number is divisible by 3 and 5
// Otherwise, just print out the current number

import * as readline from "readline";

let r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r1.question("Please enter a number to fizzbuzz up to: ", (input) => {
  let num = parseInt(input);
  fizzbuzz(num);
  r1.close();
});

function fizzbuzz(n: number) {
  for (let i = 1; i <= n; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    if (output === "") output = i.toString();
    console.log(output);
  }
}
