const fs = require('fs');

// Load data
const loadFile = (file) => {
    const data = fs.readFileSync(file);
    return JSON.parse(data);
}


module.exports = {
    loadFile
}