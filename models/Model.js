const fs = require('fs');

// Classe Model
class Model {
    nomeFile;

    constructor(nomeFile) {
        this.nomeFile = `${nomeFile}` + '.json';
    }

    read() {
        // const fileData = fs.readFileSync(this.nomeFile, 'utf8');
        // return JSON.parse(fileData);
    }

    add(item) {
        // const fileData = this.read();
        // fileData.push(item);

        // fs.writeFileSync(this.nomeFile, JSON.stringify(fileData));
    }
}

module.exports = {
    Model
}