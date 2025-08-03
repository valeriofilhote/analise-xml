const fs = require('node:fs/promises')
const PathHandler = require('./path-handler')
const path = require('node:path')
const { XMLParser } = require('fast-xml-parser')

const parser = new XMLParser({
    parseTagValue: false, // Não tenta converter os valores
    parseAttributeValue: false, // Também não converte valores de atributos
})

async function xmlContentHandler(fileName) {
    const filePath = path.join(PathHandler.xmlFilesPath, fileName)
    const xmlContent = await fs.readFile(filePath, {encoding: 'utf-8'})
    return parser.parse(xmlContent)
}

module.exports = xmlContentHandler