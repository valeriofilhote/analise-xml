import PathHandler from './handlers/path-handler.js'
import readXmlContentFile from './handlers/file-handler.js'
import xmlContentHandler from './handlers/xml-content-handler.js'
import deliveryInfoExtractor from './handlers/delivery-info-extractor.js'
import Logger from './util/logger.js'
import SheetInfoExtractor from './handlers/sheet-info-extractor.js'
import ImportationResult from './util/importation-result.js'
import ExcelBuilder from './handlers/excel-builder.js'

async function main() {

    // ImportationResult
    const importationResult = new ImportationResult()

    // Get files names
    const fileNames = await readXmlContentFile(PathHandler.xmlFilesPath)
    if (fileNames.error) {
        return console.error('Error on reading xmls folder:', fileNames.error)
    }

    importationResult.setFilesQuantity(fileNames.length)

    // Read file contents
    const contents = []
    for (const fileName of fileNames) {
        const xmlContent = await xmlContentHandler(fileName)
        contents.push(deliveryInfoExtractor(xmlContent))
    }
    // Get errors
    const errors = contents.filter(c => c.error)
    importationResult.setErrorQuantity(errors.length)

    // Get results
    const results = contents.filter(c => !c.error).map(c => c.result)
    importationResult.setResultsQuantity(results.length)
    Logger(results, 'results.json')

    // Init Sheet Info Extractor
    const sheetInfoExtractor = new SheetInfoExtractor(results)

    // Extract products
    const products = sheetInfoExtractor.extractProducts()
    importationResult.setProductsQuantity(products.length)
    Logger(products, 'products.json')

    // Extract Clients
    const clients = sheetInfoExtractor.extractClients()
    importationResult.setClientsQuantity(clients.length)
    Logger(clients, 'clients.json')

    // Extract Deliveries
    const deliveries = sheetInfoExtractor.extractDeliveries()
    importationResult.setDeliveriesQuantity(deliveries.length)
    Logger(deliveries, 'deliveries.json')

    // Print ImportationResult
    importationResult.printResult()

    // Create the excel file with the data
    const excelBuilder = new ExcelBuilder(clients, products, deliveries)
    await excelBuilder.build()

    console.log('Arquivos Excel gerados com sucesso na pasta temp!')
}

main().catch(err => console.error(err))