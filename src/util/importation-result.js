class ImportationResult {
    setFilesQuantity(qte){
        this.filesQuantity = qte
    }

    setErrorQuantity(qte){
        this.errorQuantity = qte
    }

    setResultsQuantity(qte){
        this.resultsQuantity = qte
    }

    setProductsQuantity(qte){
        this.productsQuantity = qte
    }

    setClientsQuantity(qte){
        this.clientsQuantity = qte
    }

    setDeliveriesQuantity(qte){
        this.deliveriesQuantity = qte
    }

    printResult() {
        console.log(`
            Files Quantity: ${this.filesQuantity}
            Error Quantity: ${this.errorQuantity}
            Results Quantity: ${this.resultsQuantity}
            Products Quantity: ${this.productsQuantity}
            Clients Quantity: ${this.clientsQuantity}
            Deliveries Quantity: ${this.deliveriesQuantity}
        `)
    }
}

export default ImportationResult