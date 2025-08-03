const path = require('node:path')

const rootPath = process.cwd()
const PathHandler = {
    xmlFilesPath: path.join(rootPath, 'xmls'),
    tempPath: path.join(rootPath, 'temp')
}

module.exports = PathHandler