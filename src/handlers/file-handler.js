const fs = require('node:fs/promises')

async function readXmlContentFile(xmlFilePath) {
    const filesNames = await fs.readdir(xmlFilePath, {encoding: 'utf-8'})
    if(filesNames.length === 0) {
        return {error: "No files found in :" + xmlFilePath}
    }
    return filesNames
}

module.exports = readXmlContentFile