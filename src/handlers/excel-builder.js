const ExcelJS = require('exceljs');
const path = require('node:path')
const PathHandler = require('./path-handler')

class ExcelBuilder {
    constructor(clients, products, deliveries) {
        this.clients = clients;
        this.products = products; 
        this.deliveries = deliveries;

        this.workbook = new ExcelJS.Workbook();
        this.clientsSheet = this.workbook.addWorksheet('Clients');
        this.productsSheet = this.workbook.addWorksheet('Products');
        this.deliveriesSheet = this.workbook.addWorksheet('Deliveries');
    }

    #buildProducts() {
        // Definir cabeçalhos para produtos
        this.productsSheet.columns = [
            { header: 'Código', key: 'cProd', numFmt: '@' }, // Formato '@' força o Excel a tratar como texto
            { header: 'EAN', key: 'cEAN', numFmt: '@' }, // Formato '@' força o Excel a tratar como texto
            { header: 'Descrição', key: 'xProd' },
            { header: 'Unidade', key: 'uCom' },
            { header: 'Quantidade', key: 'qCom' },
            { header: 'Valor Unitário', key: 'vUnCom' },
            { header: 'Valor Total', key: 'vProd' },
            { header: 'EAN Tributário', key: 'cEANTrib', numFmt: '@' } // Formato '@' força o Excel a tratar como texto
        ]
        const productData = this.products.map(p => ({
            // Prefixar com aspa simples para forçar o Excel a tratar como texto
            cProd: p.cProd ? "'" + p.cProd : '',
            // Prefixar com aspa simples para forçar o Excel a tratar como texto
            cEAN: p.cEAN ? "'" + p.cEAN : '',
            xProd: p.xProd,
            uCom: p.uCom,
            qCom: p.qCom,
            vUnCom: p.vUnCom,
            vProd: p.vProd,
            // Prefixar com aspa simples para forçar o Excel a tratar como texto
            cEANTrib: p.cEANTrib ? "'" + p.cEANTrib : ''
        }))
        // Adicionar dados de produtos
        this.productsSheet.addRows(productData)
    }

    #buildDeliveries() {
        // Definir cabeçalhos para entregas
        this.deliveriesSheet.columns = [
            { header: 'Nota Fiscal', key: 'nNF' },
            { header: 'Data Emissão', key: 'dhEmi' },
            { header: 'Natureza Operação', key: 'natOp' },
            { header: 'CNPJ Emitente', key: 'emit_CNPJ', numFmt: '@' }, // Formato '@' força o Excel a tratar como texto
            { header: 'Nome Emitente', key: 'emit_xNome' },
            { header: 'Município Emitente', key: 'emit_xMun' },
            { header: 'CNPJ Destinatário', key: 'dest_CNPJ', numFmt: '@' }, // Formato '@' força o Excel a tratar como texto
            { header: 'Nome Destinatário', key: 'dest_xNome' },
            { header: 'Município Destinatário', key: 'dest_xMun' }
        ]
        
        // Adicionar dados de entregas (sem os detalhes)
        const deliveriesData = this.deliveries.map(d => ({
            nNF: d.nNF,
            dhEmi: d.dhEmi,
            natOp: d.natOp,
            // Prefixar com aspa simples para forçar o Excel a tratar como texto
            emit_CNPJ: d.emit_CNPJ ? "'" + d.emit_CNPJ : '',
            emit_xNome: d.emit_xNome,
            emit_xMun: d.emit_xMun,
            // Prefixar com aspa simples para forçar o Excel a tratar como texto
            dest_CNPJ: d.dest_CNPJ ? "'" + d.dest_CNPJ : '',
            dest_xNome: d.dest_xNome,
            dest_xMun: d.dest_xMun
        }))
        this.deliveriesSheet.addRows(deliveriesData)
    }

    #buildClients() {
        // Definir cabeçalhos para clientes
        this.clientsSheet.columns = [
            { header: 'CNPJ', key: 'CNPJ', numFmt: '@' }, // Formato '@' força o Excel a tratar como texto
            { header: 'Nome', key: 'xNome' },
            { header: 'Município', key: 'xMun' }
        ]

        const clientData = this.clients.map(c => ({
            // Prefixar com aspa simples para forçar o Excel a tratar como texto
            CNPJ: c.CNPJ ? "'" + c.CNPJ : '',
            xNome: c.xNome,
            xMun: c.xMun
        }))
        
        // Adicionar dados de clientes
        this.clientsSheet.addRows(clientData)
    }

    async build() {
        this.#buildProducts()
        this.#buildClients()
        this.#buildDeliveries()
        // Gera o arquivo para analise
        await this.workbook.xlsx.writeFile(path.join(PathHandler.tempPath, 'analise-xml.xlsx'))
    }
}

module.exports = ExcelBuilder;
