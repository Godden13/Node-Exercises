const { createWriteStream } = require('fs');
const {open, writeFile, writeSync} = require('fs/promises')

async function execute(){
  const fileHandle = await open('./static/counter.txt', 'w')
  for(let i = 0; i < 1000000000; i++) {
    writeFile(fileHandle, `${i}     `)
  }
  fileHandle.close();
  console.timeEnd("track")
}

// async function execute() {
//   const stream = createWriteStream
// }

execute();