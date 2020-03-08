const fs = require('fs');
const path = require('path');


const fileTraversal = function(dir, fileList = []) {
    let currentFolderFiles = fs.readdirSync(dir);

    currentFolderFiles.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            fileList = fileTraversal(dir + '/' + file, fileList);
        }
        else {
            fileList.push(path.resolve(dir,  file));
        }
    });



    return fileList;
};

module.exports = {
    fileTraversal
};
