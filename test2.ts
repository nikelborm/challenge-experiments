const rot = require('rot')
const fun = x => (2 ^ (x + 1) + 1) / (x ^ 2 - 3 * x + 2);

const cipher = 'GHTSOPZY'.toLowerCase();

console.table(
  [...cipher].filter((_, i) => !!(i % 2))
    .map(letter => ({
      letter,
      letterIndexWhereAis1: letter.charCodeAt(0)-96,
      // res: fun(letter.charCodeAt(0)-96),

    }))
);
// 6, 2,
// 6, 2,
// 2, 2,
// 4, 2,
// zzvx
// ffbd
