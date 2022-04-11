// Resize.js

const sharp = require('sharp');
// const uuidv4 = require('uuid');
const path = require('path');
// import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require('uuid')

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .toFile(filepath);
    
    return filename;
  }
  static filename() {
     // random file name
    console.log('uuid4 = ', uuidv4);
    return `${uuidv4.v4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;
