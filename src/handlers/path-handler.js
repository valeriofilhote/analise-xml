import path from 'node:path'

const rootPath = process.cwd()
const PathHandler = {
    xmlFilesPath: path.join(rootPath, 'xmls'),
    tempPath: path.join(rootPath, 'temp')
}

export default PathHandler