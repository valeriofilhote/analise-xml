const path = require('node:path')
const fs = require('node:fs/promises')

async function Logger(info, filename = 'log.json'){
    const logPath = path.join(process.cwd(), 'temp', filename)
    await fs.writeFile(
        logPath, 
        JSON.stringify(info), 
        {encoding: 'utf-8'}
    )
}

module.exports = Logger