const PathHandler = require('./handlers/path-handler')
const readXmlContentFile = require('./handlers/file-handler')
const xmlContentHandler = require('./handlers/xml-content-handler')
const deliveryInfoExtractor = require('./handlers/delivery-info-extractor')
const path = require('node:path')
const fs = require('node:fs/promises')
const Logger = require('./util/logger')
const SheetInfoExtractor = require('./handlers/sheet-info-extractor')
const ImportationResult = require('./util/importation-result')

async function main() {
    // ImportationResult
    const importationResult = new ImportationResult()

    // Get files names
    const fileNames = await readXmlContentFile(PathHandler.xmlFilesPath)
    if(fileNames.error){
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

    // Save Excel file

    // Print ImportationResult
    importationResult.printResult()
}

main().catch(err => console.error(err))