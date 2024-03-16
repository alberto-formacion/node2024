const fs = require('node:fs/promises');

const directory = process.argv[2] ?? "./";

fs.readdir(directory)
  .then(files => {
    files.forEach(file => {
      fs.stat(directory + "\\" + file).then(stat=>{
        const directory = stat.isDirectory()?"<DIR>":"";
        const size = (stat.size / 1024).toFixed(2);
        console.log(file.padEnd(60) + directory.padEnd(10) + (stat.isDirectory()?"":(size + " MB")));
      })
      
    })
  })
  .catch(err => {
    if (err) {
      console.error('Error al leer el directorio: ', err)
      return;
    }
  })