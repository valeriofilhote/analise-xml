function deliveryInfoExtractor(xmlContent) {
    const result = {}
    if(!xmlContent || !xmlContent.nfeProc || !xmlContent.nfeProc.NFe || !xmlContent.nfeProc.NFe.infNFe) {
        return {error: 'Invalid XML content'}
    }
    const info = xmlContent.nfeProc.NFe.infNFe
    if(!info.ide || !info.ide.natOp || !info.ide.nNF || !info.ide.dhEmi){
        return {error: 'Invalid XML content - ide'}
    }
    result.ide = {
        natOp: info.ide.natOp,
        nNF: info.ide.nNF,
        dhEmi: info.ide.dhEmi
    }
    
    if(!info || !info.emit || !info.emit.CNPJ || !info.emit.xNome || !info.emit.enderEmit || !info.emit.enderEmit.xMun){
        return {error: 'Invalid XML content - emit'}
    }
    result.emit = {
        CNPJ: info.emit.CNPJ,
        xNome: info.emit.xNome,
        xMun: info.emit.enderEmit.xMun
    }

    if(!info || !info.dest || !info.dest.CNPJ || !info.dest.xNome || !info.dest.enderDest || !info.dest.enderDest.xMun){
        return {error: 'Invalid XML content - dest'}
    }
    result.dest = {
        CNPJ: info.dest.CNPJ,
        xNome: info.dest.xNome,
        xMun: info.dest.enderDest.xMun
    }

    if(!info.det || !Array.isArray(info.det)){
        return {error: 'Invalid XML content - det'}
    }
    result.det = info.det.map(item => {
        if(
            !item || !item.prod || !item.prod.cProd || !item.prod.cEAN ||
            !item.prod.xProd || !item.prod.uCom || !item.prod.qCom || !item.prod.vUnCom ||
            !item.prod.vProd || !item.prod.cEANTrib
        ){
            return {error: 'Invalid XML content - prod'}
        }
        return {
            cProd: item.prod.cProd,
            cEAN: item.prod.cEAN,
            xProd: item.prod.xProd,
            uCom: item.prod.uCom,
            qCom: item.prod.qCom,
            vUnCom: item.prod.vUnCom,
            vProd: item.prod.vProd,
            cEANTrib: item.prod.cEANTrib
        }
    })

    if(!info.transp || !info.transp.vol || !info.transp.vol){
       return {error: 'Invalid XML content - transp'} 
    }

    result.vol = {
        qVol: info.transp.vol.qVol,
        esp: info.transp.vol.esp,
        pesoL: info.transp.vol.pesoL,
        pesoB: info.transp.vol.pesoB,
    }
    
    
    return {error: null, result}
}

export default deliveryInfoExtractor