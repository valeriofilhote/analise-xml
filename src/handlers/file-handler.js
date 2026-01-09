import { readdir } from 'node:fs/promises'

async function readXmlContentFile(xmlFilePath) {
    let filesNames = await readdir(xmlFilePath, { encoding: 'utf-8' })

    filesNames = filesNames.filter(file => file.endsWith('.xml'))

    if (filesNames.length === 0) {
        return { error: "No files found in :" + xmlFilePath }
    }
    return filesNames
}

export default readXmlContentFile