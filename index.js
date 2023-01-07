const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageFiles = ['buggy1.png', 'buggy2.png', 'buggy3.png'];
const sizes = [
    { width: 400, height: 210 },
    { width: 640, height: 336 },
    { width: 1200, height: 630 },
    { width: 1600, height: 840 },
    { width: 3900, height: 2048 }
  ];

if (!fs.existsSync('processed')){
  fs.mkdirSync('processed');
}

for (const imageFile of imageFiles) {
  const image = imageFile.replace(/\.[^/.]+$/, "")
  for (const size of sizes) {
    sharp(path.join(__dirname, 'images', imageFile))
      .resize(size.width, size.height)
      .toFormat('webp', {quality: 75, effort: 6})
      .toFile(`processed/${image}-${size.width}x${size.height}.webp`)
      .then(() => console.log(`Successfully resized ${image} to ${size}px and converted to webp.`))
      .catch((error) => console.log(error));
  }
}