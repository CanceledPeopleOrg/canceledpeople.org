const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

function renderFile(fileName, data = {}) {
  ejs.renderFile(path.join(fileName), data, function(err, html) {
    if (err) console.log(err);
    const outputFileName = `${fileName.split('.')[0]}.html`;
    fs.writeFileSync(path.join(outputFileName), html, 'utf8');
  });
}

renderFile("index.ejs")
renderFile("about/index.ejs")
renderFile("cancelations/index.ejs")
renderFile("cancellations/index.ejs", {date: Date.now()})
renderFile("submissions/index.ejs")
