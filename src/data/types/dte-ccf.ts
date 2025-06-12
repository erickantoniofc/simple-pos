export interface Direccion {
  departamento: string; // 01-14, depende del departamento aplican validaciones en municipio
  municipio: string; // dos dígitos, con patrón validado por departamento
  complemento: string; // 1-200 caracteres
}

export interface IdentificacionCF {
  version: 3;
  ambiente: '00' | '01';
  tipoDte: '03';
  numeroControl: string; // DTE-03-XXXXXXXX-XXXXXXXXXXXXXXX
  codigoGeneracion: string; // UUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
  tipoModelo: 1 | 2;
  tipoOperacion: 1 | 2;
  tipoContingencia: 1 | 2 | 3 | 4 | 5 | null;
  motivoContin: string | null; // 1-150 caracteres
  fecEmi: string; // yyyy-mm-dd
  horEmi: string; // HH:mm:ss
  tipoMoneda: 'USD';
}

export interface DocumentoRelacionadoCF {
  tipoDocumento: '04' | '08' | '09';
  tipoGeneracion: 1 | 2;
  numeroDocumento: string; // UUID si tipoGeneracion === 2
  fechaEmision: string; // yyyy-mm-dd
}

export interface EmisorCF {
  nit: string; // 9 o 14 dígitos
  nrc: string; // 1-8 dígitos
  nombre: string; // 3-200 caracteres
  codActividad: string; // 2-6 dígitos
  descActividad: string; // 1-150 caracteres
  nombreComercial: string | null; // 1-150 caracteres
  tipoEstablecimiento: '01' | '02' | '04' | '07' | '20';
  direccion: Direccion;
  telefono: string; // 8-30 caracteres
  correo: string; // 3-100 caracteres, formato email
  codEstableMH: string | null; // 4 caracteres
  codEstable: string | null; // 1-10 caracteres
  codPuntoVentaMH: string | null; // 4 caracteres
  codPuntoVenta: string | null; // 1-15 caracteres
}

export interface ReceptorCF {
  nit: string; // 9 o 14 dígitos
  nrc: string; // 1-8 dígitos
  nombre: string; // 1-250 caracteres
  codActividad: string; // 2-6 dígitos
  descActividad: string; // 1-150 caracteres
  nombreComercial: string | null; // 1-150 caracteres
  direccion: Direccion;
  telefono: string | null; // 8-30 caracteres
  correo: string; // 3-100 caracteres, email
}

export interface MedicoCF {
  nombre: string; // hasta 100 caracteres
  nit: string | null; // 9 o 14 dígitos
  docIdentificacion: string | null; // 2-25 caracteres
  tipoServicio: number; // 1-6
}

export interface OtrosDocumentosCF {
  codDocAsociado: number; // 1-4
  descDocumento: string | null; // hasta 100 caracteres
  detalleDocumento: string | null; // hasta 300 caracteres
  medico: MedicoCF | null;
}

export interface VentaTerceroCF {
  nit: string; // 9 o 14 dígitos
  nombre: string; // 3-200 caracteres
}

export interface CuerpoDocumentoCF {
  numItem: number; // 1-2000
  tipoItem: 1 | 2 | 3 | 4;
  numeroDocumento: string | null; // hasta 36 caracteres
  codigo: string | null; // 1-25 caracteres
  codTributo: 'A8' | '57' | '90' | 'D4' | 'D5' | '25' | 'A6' | null;
  descripcion: string; // hasta 1000 caracteres
  cantidad: number; // > 0, múltiplo 0.00000001
  uniMedida: number; // 1-99 (o 99 si tipoItem === 4)
  precioUni: number; // >= 0, múltiplo 0.00000001
  montoDescu: number; // >= 0, múltiplo 0.00000001
  ventaNoSuj: number;
  ventaExenta: number;
  ventaGravada: number;
  tributos: string[] | null; // códigos únicos de 2 caracteres
  psv: number;
  noGravado: number;
}

export interface TributoResumenCF {
  codigo: string; // 2 caracteres
  descripcion: string; // 2-150 caracteres
  valor: number; // > 0, múltiplo 0.01
}

export interface PagoCF {
  codigo: string; // 01-14 o 99
  montoPago: number; // múltiplo 0.01
  referencia: string | null; // hasta 50 caracteres
  plazo: string | null; // 01, 02, 03
  periodo: number | null;
}

export interface ResumenCF {
  totalNoSuj: number;
  totalExenta: number;
  totalGravada: number;
  subTotalVentas: number;
  descuNoSuj: number;
  descuExenta: number;
  descuGravada: number;
  porcentajeDescuento: number;
  totalDescu: number;
  tributos: TributoResumenCF[] | null;
  subTotal: number;
  ivaPerci1: number;
  ivaRete1: number;
  reteRenta: number;
  montoTotalOperacion: number;
  totalNoGravado: number;
  totalPagar: number;
  totalLetras: string;
  saldoFavor: number;
  condicionOperacion: 1 | 2 | 3;
  pagos: PagoCF[] | null;
  numPagoElectronico: string | null;
}

export interface ExtensionCF {
  nombEntrega: string | null; // 1-100 caracteres
  docuEntrega: string | null; // 1-25 caracteres
  nombRecibe: string | null; // 1-100 caracteres
  docuRecibe: string | null; // 1-25 caracteres
  observaciones: string | null; // hasta 3000 caracteres
  placaVehiculo: string | null; // 2-10 caracteres
}

export interface ApendiceCF {
  campo: string; // 2-25 caracteres
  etiqueta: string; // 3-50 caracteres
  valor: string; // 1-150 caracteres
}

export interface ComprobanteCreditoFiscal {
  identificacion: IdentificacionCF;
  documentoRelacionado: DocumentoRelacionadoCF[] | null;
  emisor: EmisorCF;
  receptor: ReceptorCF;
  otrosDocumentos: OtrosDocumentosCF[] | null;
  ventaTercero: VentaTerceroCF | null;
  cuerpoDocumento: CuerpoDocumentoCF[];
  resumen: ResumenCF;
  extension: ExtensionCF | null;
  apendice: ApendiceCF[] | null;
}
