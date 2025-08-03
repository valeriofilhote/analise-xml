import { readFile } from 'node:fs/promises'
import PathHandler from './path-handler.js'
import path from 'node:path'
import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
    parseTagValue: false, // Não tenta converter os valores
    parseAttributeValue: false, // Também não converte valores de atributos
})

async function xmlContentHandler(fileName) {
    const filePath = path.join(PathHandler.xmlFilesPath, fileName)
    const xmlContent = await readFile(filePath, {encoding: 'utf-8'})
    return parser.parse(xmlContent)
}

export default xmlContentHandler