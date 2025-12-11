/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const curry = (fn: Function) => {
  return function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(this: any, ...nextArgs: any[]) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}