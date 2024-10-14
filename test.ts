const vigenere = require('vigenere');
const rotate = require('rot');

function logObjectNicely(item: Record<string, any> | any[]): void {
  console.dir(item, {
    colors: true,
    compact: false,
    depth: null,
    maxArrayLength: null
  });
}

const iterateInChunks = async <T>({
  chunkSize,
  array,
  callOnIteration,
  callAfterChunk,
}: {
  chunkSize: number;
  array: T[];
  callOnIteration: (element: T) => any;
  callAfterChunk: () => Promise<void> | void;
}): Promise<void> => {
  let chunkIndex = 0;

  const iterateInChunk = async (limit: number): Promise<void> => {
    for (let i = chunkIndex * chunkSize; i < limit; i += 1) {
      // TODO: Покрыть тестами, потому что ts говорит, что тут может быть проблема
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore idk wtf
      // eslint-disable-next-line security/detect-object-injection
      callOnIteration(array[i]);
    }
    await callAfterChunk();
  };

  for (; chunkIndex < Math.floor(array.length / chunkSize); chunkIndex += 1) {
    // eslint-disable-next-line no-await-in-loop
    await iterateInChunk(chunkIndex * chunkSize + chunkSize);
  }

  if (chunkIndex * chunkSize < array.length) {
    await iterateInChunk(array.length);
  }
};


let cipher = 'GHTSOPZY'.toLowerCase();
// cipher = [...cipher].reverse().join('');

const evenLetters = [...cipher].filter((_, i) => i % 2)
const oddLetters = [...cipher].filter((_, i) => !(i % 2))

const rotEncrypt = (message: string, index: number) => rotate(message, index)
const rotDecrypt = (message: string, index: number) => rotate(message, 26 - index)



//  G  H  T  S  O  P  Z  Y
//  G  H  O  P  S  T  Y  Z

//  0  1  2  3  4  5  6  7 -- old indexes
// +0 +0 +3 +1 -2 -2 +1 -1 -- shift to old index
//  0  1  5  6  2  3  7  6 -- new index of the letter





let tips = [
  'empty',
  'sadhmn',
  'sadhuman',
  'reverse',
  'freedom',
  'free',
  'ancient',
  'cryptography',
  'crypto',
  'childhood',
  'love',
  'revert',
  'mirror',
  'digits',
  'symmetry',
  'symmetrical',
  'number',
  'function',
  'reflect',
  'reflection',
  'truth',
  'false',
  'remember',
  'history',
  'cycle',
  'reminder',
  'memory',
  'ram',
  'forget',
  'forgot',
  'blow',
  'fish',
  'forgotten',
  'math',
  'mathematic',
  'nothing',
  'solution',
  'useless',
  'same',
  'lazy',
  'result',
  'comeback',
  'return',
  'past',
  'new',
  'old',
  'present',
  'formula',
  'future',
  'returns',
  'cipher',
  'known',
  'knowledge',
  'encrypt',
  'decrypt',
  'key',
  'lock',
  'school',
  'gay',
  'trans',
  'lesbian',
  'lgbt',
  'lgbtqia',
  'hitech',
  'tattoo',
  'pass',
  'text',
  'asis',
  'secret',
  'password',
  'pwd',
  'task',
]
tips = tips.concat(tips.map(t => [...t.toLowerCase()].reverse().join("")));
// tips = tips.concat(
//   tips.map(t => [...t].toSpliced(0, 2).join("")),
//   tips.map(t => [...t].toSpliced(1, 2).join("")),
// );
tips = tips.filter(Boolean)


let counter = 0


const results: Record<string, any>[] = tips
  .flatMap(
    tip => [ 0, 1, /* 2, 12, 21 */ ]
      .map(n => ({
        tip,
        rotIndexAppliedToCipher: n,
        cipherPostRot: rot(cipher, n),
      })
    )
  )
  .flatMap(
    ({ tip, cipherPostRot, rotIndexAppliedToCipher }) => ([
      ['as-is',    res => res],
      ['reverser', res => [...res].reverse().join('')],
    ] as const).map(([ resultPostProcessorName, transformer ]) => ({
      tip,
      cipherPostRot,
      rotIndexAppliedToCipher,
      result: transformer(vigenere.decode(cipherPostRot, tip)),
      resultPostProcessorName,
      transformer,
    }))
  );


function print(array: Record<string, any>[]) {
  let chunk: Record<string, any>[] = [];

  iterateInChunks({
    chunkSize: 30,
    array,
    callAfterChunk: () => {
      console.table(chunk);
      console.log(`${++counter}\n\n`)
      chunk = []
    },
    callOnIteration: (res) => chunk.push(res)
  })
}

print(results)
