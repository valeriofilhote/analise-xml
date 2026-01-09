class SheetInfoExtractor {
    constructor(results) {
        this.results = results
    }

    extractProducts() {
        const products = []

        for (const result of this.results) {
            result.dest.items.forEach(p => {
                const addedProduct = products.find(prod => prod.cProd === p.cProd)
                if (!addedProduct) {
                    products.push({
                        cProd: p.cProd,
                        cEAN: p.cEAN,
                        xProd: p.xProd,
                        uCom: p.uCom,
                        qCom: p.qCom,
                        vUnCom: p.vUnCom,
                        vProd: p.vProd,
                        cEANTrib: p.cEANTrib
                    })
                }
            })
        }

        return products
    }

    extractClients() {
        const clients = []
        for (const result of this.results) {
            const addedClient = clients.find(c => c.CNPJ === result.dest.CNPJ)
            if (!addedClient) {
                clients.push({
                    CNPJ: result.dest.CNPJ,
                    xNome: result.dest.xNome,
                    xMun: result.dest.xMun
                })
            }
        }
        return clients
    }

    extractDeliveries() {
        const deliveries = []
        for (const result of this.results) {
            const addedDelivery = deliveries.find(d => (
                d.nNF === result.ide.nNF &&
                d.emit_CNPJ === result.emit.CNPJ
            ))
            if (!addedDelivery) {
                deliveries.push({
                    nNF: result.ide.nNF,
                    dhEmi: result.ide.dhEmi,
                    natOp: result.ide.natOp,
                    emit_CNPJ: result.emit.CNPJ,
                    emit_xNome: result.emit.xNome,
                    emit_xMun: result.emit.xMun,
                    dest_CNPJ: result.dest.CNPJ,
                    dest_xNome: result.dest.xNome,
                    dest_xMun: result.dest.xMun,
                    items: result.dest.items
                })
            }
        }
        return deliveries
    }
}

export default SheetInfoExtractor