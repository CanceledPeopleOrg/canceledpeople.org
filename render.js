const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

function renderFile(fileName) {
  ejs.renderFile(path.join(fileName), {}, function(err, html) {
    if (err) console.log(err);
    const outputFileName = `${fileName.split('.')[0]}.html`;
    fs.writeFileSync(path.join(outputFileName), html, 'utf8');
  });
}

renderFile("index.ejs")
renderFile("about/index.ejs")
renderFile("cancellations/index.ejs")
renderFile("submissions/index.ejs")
