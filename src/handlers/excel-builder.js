import ExcelJS from 'exceljs';
import path from 'node:path';
import PathHandler from './path-handler.js';

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
            { header: 'EAN', key: 'cEAN', numFmt: '@' },
            { header: 'EAN Tributário', key: 'cEANTrib', numFmt: '@' },
            { header: 'Descrição', key: 'xProd' },
            { header: 'Unidade', key: 'uCom' },
        ]
        const productData = this.products.map(p => ({
            cProd: p.cProd,
            cEAN: p.cEAN,
            xProd: p.xProd,
            uCom: p.uCom,
            qCom: p.qCom,
            vUnCom: p.vUnCom,
            vProd: p.vProd,
            cEANTrib: p.cEANTrib,
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
            { header: 'Município Destinatário', key: 'dest_xMun' },
            { header: 'Código do Produto', key: 'cProd' },
            { header: 'Descrição do Produto', key: 'xProd' },
            { header: 'Unidade de Compra', key: 'uCom' },
            { header: 'Quantidade de Compra', key: 'qCom' },
            { header: 'Valor Unitário', key: 'vUnCom' },
            { header: 'Valor Total', key: 'vProd' },
            { header: 'EAN', key: 'cEAN' },
            { header: 'DUN', key: 'cEANTrib' },
            { header: 'Informações Adicionais', key: 'infAdProd' },
        ]

        // Adicionar dados de entregas (sem os detalhes)
        const rows = []
        for (const d of this.deliveries) {
            for (const item of d.items) {
                rows.push({
                    nNF: d.nNF,
                    dhEmi: d.dhEmi,
                    natOp: d.natOp,
                    emit_CNPJ: d.emit_CNPJ,
                    emit_xNome: d.emit_xNome,
                    emit_xMun: d.emit_xMun,
                    dest_CNPJ: d.dest_CNPJ,
                    dest_xNome: d.dest_xNome,
                    dest_xMun: d.dest_xMun,
                    cProd: item.cProd,
                    xProd: item.xProd,
                    uCom: item.uCom,
                    qCom: item.qCom,
                    vUnCom: item.vUnCom,
                    vProd: item.vProd,
                    cEAN: item.cEAN,
                    cEANTrib: item.cEANTrib,
                    infAdProd: item.infAdProd,
                })
            }
        }
        this.deliveriesSheet.addRows(rows)
    }

    #buildClients() {
        // Definir cabeçalhos para clientes
        this.clientsSheet.columns = [
            { header: 'CNPJ', key: 'CNPJ', numFmt: '@' }, // Formato '@' força o Excel a tratar como texto
            { header: 'Nome', key: 'xNome' },
            { header: 'Município', key: 'xMun' }
        ]

        const clientData = this.clients.map(c => ({
            CNPJ: c.CNPJ,
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

export default ExcelBuilder;
