import { actividades } from "@/data/catalogs/activadades-economicas";
import type { Branch, PosPoint } from "@/data/types/branch";
import type { Company } from "@/data/types/company";
import type { CuerpoDocumento, FacturaElectronica } from "@/data/types/dte-fe";
import type { Sale } from "@/data/types/sale";
import { format } from 'date-fns';
import { numeroALetras } from "./numero-a-letras";


export const saleToFe = (sale: Sale, branch: Branch, pos: PosPoint, corr: string, company: Company): FacturaElectronica => {
    if(branch.haciendaCode.length < 4 || pos.haciendaCode.length < 4) throw new Error('El codigo de sucursal o punto de ventas no es correcto');
    if(corr.length < 15) throw new Error("El correlativo debe tener una longitud de 15 caracteres");
    
    const documentType = sale.customer?.dui ? "13" : sale.customer?.nit ? "36" : null
    const receptorActivityDesc = actividades.find(a=> a.value === sale.customer?.activity?.toString());
    const now = new Date();
    const date = format(now, 'yyyy-MM-dd');
    const time = format(now, 'HH:mm:ss');
    const totalLetras = numeroALetras(sale.total);

    const cuerpoDocumento: CuerpoDocumento[] = sale.saleItems.map((item, index) => ({
        numItem: index + 1,
        tipoItem: 1,
        numeroDocumento: null,
        cantidad: item.quantity,
        codigo: null,
        codTributo: null,
        uniMedida: 59,
        descripcion: item.product.name,
        precioUni: item.price,
        montoDescu: item.discount,
        ventaNoSuj: 0,
        ventaExenta: 0,
        ventaGravada: item.subtotal,
        tributos: null,
        psv: 0,
        noGravado: 0,
        ivaItem: (item.price * (13/113))
    }));

    const enviroment: "00" | "01" = "00"; //'00' -> test '01' -> production
    const  tipoModelo: 1 | 2 = 1;
    const tipoOperacion: 1 | 2 = 1;
    const fe = {
        identificacion: {
            version: 1,
            ambiente: enviroment,
            tipoDte: '01', //factura electronica
            numeroControl: `DTE-01-${branch.haciendaCode}${pos.haciendaCode}-${corr}`,
            codigoGeneracion: sale._id ?? "",
            tipoModelo: tipoModelo,
            tipoOperacion: tipoOperacion,
            tipoContingencia: null,
            motivoContin: null, 
            fecEmi: date, 
            horEmi: time,
            tipoMoneda: 'USD'
        },
        documentoRelacionado: null,
        emisor: {
            nit: company.nit,
            nrc: company.nrc,
            nombre: company.name,
            codActividad: company.economicActivityCode,
            descActividad: company.economicActivityDescription,
            nombreComercial: branch.commercialName,
            tipoEstablecimiento: '01',
            direccion: {
                departamento: branch.department,
                municipio: branch.municipality,
                complemento: branch.address
            },
            telefono: company.phone,
            correo: company.email,
            codEstableMH: branch.haciendaCode,
            codEstable: null,
            codPuntoVentaMH: pos.haciendaCode,
            codPuntoVenta: null
        },
        receptor: {
            tipoDocumento: documentType,
            numDocumento: sale.customer?.dui ?? null,
            nrc: sale.customer?.nrc ?? null,
            nombre: sale.customer?.name ?? null,
            codActividad: sale.customer?.activity?.toString() ?? null,
            descActividad: receptorActivityDesc?.label ?? null,
            direccion: {
                departamento: sale.customer?.department ?? "",
                municipio: sale.customer?.municipality ?? "",
                complemento: sale.customer?.address ?? ""
            },
            telefono: sale.customer?.phone ?? null,
            correo: sale.customer?.email ?? null
        },
        otrosDocumentos: null,
        ventaTercero: null,
        cuerpoDocumento: cuerpoDocumento,
        resumen: {
            totalNoSuj: 0,
            totalExenta: 0,
            totalGravada: sale.total,
            subTotalVentas: sale.total,
            descuNoSuj: 0,
            descuExenta: 0,
            descuGravada: 0,
            porcentajeDescuento: 0,
            totalDescu: 0,
            tributos: null,
            subTotal: sale.total,
            ivaRete1: 0,
            reteRenta: 0,
            montoTotalOperacion: sale.total,
            totalNoGravado: 0,
            totalPagar: sale.total,
            totalLetras: totalLetras,
            totalIva: (sale.total * (13/113)),
            saldoFavor: 0,
            condicionOperacion: Number(sale.transactionTerm),
            pagos: [
               { 
                    codigo: sale.paymentMethod,
                    montoPago: sale.total,
                    referencia: null,
                    plazo: sale.paymentTerm[1],
                    periodo: sale.paymentTerm[0]
                }
            ],
            numPagoElectronico: null

        },
        extension: null,
        apendice: null
    }

    return fe;
};