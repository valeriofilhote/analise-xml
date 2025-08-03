const path = require('node:path')

const rootPath = process.cwd()
const PathHandler = {
    xmlFilesPath: path.join(rootPath, 'xmls')
}


module.exports = PathHandler