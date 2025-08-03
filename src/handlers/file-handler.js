import { readdir } from 'node:fs/promises'

async function readXmlContentFile(xmlFilePath) {
    const filesNames = await readdir(xmlFilePath, {encoding: 'utf-8'})
    if(filesNames.length === 0) {
        return {error: "No files found in :" + xmlFilePath}
    }
    return filesNames
}

export default readXmlContentFile