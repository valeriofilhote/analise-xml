import path from 'node:path'
import { writeFile } from 'node:fs/promises'

async function Logger(info, filename = 'log.json'){
    const logPath = path.join(process.cwd(), 'temp', filename)
    await writeFile(
        logPath, 
        JSON.stringify(info), 
        {encoding: 'utf-8'}
    )
}

export default Logger