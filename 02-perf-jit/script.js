"use strict";

function fib(x) {
	if (x == 0) {
        return 0;
    } else {
        if (x == 1) {
            return 1;
        }
    }
    return fib(x-1) + fib(x-2);
}

for (let i = 0; i < 42; i++) {
  fib(i);
}