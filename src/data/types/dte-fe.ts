export interface Direccion {
  departamento: string; // Formato: 01 al 14, según departamento
  municipio: string; // Formato: dos dígitos, validación depende del departamento
  complemento: string; // 1-200 caracteres
}

export interface Identificacion {
  version: number;
  ambiente: '00' | '01';
  tipoDte: string;
  numeroControl: string; // Formato: DTE-01-XXXXXXXX-XXXXXXXXXXXXXXX
  codigoGeneracion: string; // Formato UUID (ej: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX)
  tipoModelo: 1 | 2;
  tipoOperacion: 1 | 2;
  tipoContingencia: 1 | 2 | 3 | 4 | 5 | null;
  motivoContin: string | null; // 5-150 caracteres si se usa
  fecEmi: string; // Formato: yyyy-mm-dd
  horEmi: string; // Formato: HH:mm:ss
  tipoMoneda: string;
}

export interface DocumentoRelacionado {
  tipoDocumento: string;
  tipoGeneracion: number;
  numeroDocumento: string; // Si tipoGeneracion === 2: UUID, si === 1: máx 20 caracteres
  fechaEmision: string; // yyyy-mm-dd
}

export interface Emisor {
  nit: string; // 9 o 14 dígitos
  nrc: string; // 2-8 dígitos
  nombre: string; // 1-250 caracteres
  codActividad: string; // 5-6 dígitos
  descActividad: string; // 5-150 caracteres
  nombreComercial: string | null; // 5-150 caracteres
  tipoEstablecimiento: string;
  direccion: Direccion;
  telefono: string; // 8-30 caracteres
  correo: string; // Email válido 3-100 caracteres
  codEstableMH: string | null; // 4 caracteres
  codEstable: string | null; // 4 caracteres
  codPuntoVentaMH: string | null; // 4 caracteres
  codPuntoVenta: string | null; // 1-15 caracteres
}

export interface Receptor {
  tipoDocumento: string | null;
  numDocumento: string | null; // Validaciones especiales según tipoDocumento
  nrc: string | null; // 2-8 dígitos
  nombre: string | null; // 1-250 caracteres
  codActividad: string | null; // 5-6 dígitos
  descActividad: string | null; // 5-150 caracteres
  direccion: Direccion | null;
  telefono: string | null; // 8-30 caracteres
  correo: string | null; // Email 3-100 caracteres
}

export interface Medico {
  nombre: string;
  nit: string | null; // 9 o 14 dígitos
  docIdentificacion: string | null; // 2-25 caracteres
  tipoServicio: number; // 1-6
}

export interface OtrosDocumentos {
  codDocAsociado: number; // 1-4
  descDocumento: string | null; // hasta 100 caracteres
  detalleDocumento: string | null; // hasta 300 caracteres
  medico: Medico | null;
}

export interface VentaTercero {
  nit: string; // 9 o 14 dígitos
  nombre: string; // 1-250 caracteres
}

export interface CuerpoDocumento {
  numItem: number;
  tipoItem: 1 | 2 | 3 | 4;
  numeroDocumento: string | null;
  cantidad: number; // > 0, hasta 100 mil millones
  codigo: string | null; // 1-25 caracteres
  codTributo: 'A8' | '57' | '90' | 'D4' | 'D5' | '25' | 'A6' | null;
  uniMedida: number; // 1-99 (o 99 si tipoItem === 4)
  descripcion: string; // hasta 1000 caracteres
  precioUni: number; // > 0, múltiplo 0.00000001
  montoDescu: number; // >= 0, múltiplo 0.00000001
  ventaNoSuj: number;
  ventaExenta: number;
  ventaGravada: number;
  tributos: string[] | null; // códigos únicos de 2 caracteres
  psv: number;
  noGravado: number;
  ivaItem: number;
}

export interface TributoResumen {
  codigo: string;
  descripcion: string;
  valor: number;
}

export interface Pago {
  codigo: string; // 01-14, 99
  montoPago: number;
  referencia: string | null;
  plazo: string | null; // 01, 02, 03
  periodo: number | null;
}

export interface Resumen {
  totalNoSuj: number;
  totalExenta: number;
  totalGravada: number;
  subTotalVentas: number;
  descuNoSuj: number;
  descuExenta: number;
  descuGravada: number;
  porcentajeDescuento: number;
  totalDescu: number;
  tributos: TributoResumen[] | null;
  subTotal: number;
  ivaRete1: number;
  reteRenta: number;
  montoTotalOperacion: number;
  totalNoGravado: number;
  totalPagar: number;
  totalLetras: string;
  totalIva: number;
  saldoFavor: number;
  condicionOperacion: number;
  pagos: Pago[] | null;
  numPagoElectronico: string | null;
}

export interface Extension {
  nombEntrega: string | null;
  docuEntrega: string | null;
  nombRecibe: string | null;
  docuRecibe: string | null;
  observaciones: string | null;
  placaVehiculo: string | null;
}

export interface Apendice {
  campo: string;
  etiqueta: string;
  valor: string;
}

export interface FacturaElectronica {
  identificacion: Identificacion;
  documentoRelacionado: DocumentoRelacionado[] | null;
  emisor: Emisor;
  receptor: Receptor | null;
  otrosDocumentos: OtrosDocumentos[] | null;
  ventaTercero: VentaTercero | null;
  cuerpoDocumento: CuerpoDocumento[];
  resumen: Resumen;
  extension: Extension | null;
  apendice: Apendice[] | null;
}
