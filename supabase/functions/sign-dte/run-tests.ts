#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env

/**
 * Test runner for the sign-dte function
 * 
 * Usage:
 * deno run --allow-net --allow-read --allow-env run-tests.ts
 * 
 * Or make it executable:
 * chmod +x run-tests.ts
 * ./run-tests.ts
 */

export { }; // Make this a module

console.log("🧪 Running DTE Control Number Generation Tests...\n");

console.log("📋 To run unit tests:");
console.log("deno test --allow-net --allow-read --allow-env test.ts\n");

console.log("🔌 Integration Test Example:");
console.log("To test the actual endpoint, you can use this curl command:\n");

const testPayload = {
  dte: {
    identificacion: {
      version: 1,
      ambiente: "00" as const,
      tipoDte: "01",
      numeroControl: "", // Will be generated
      codigoGeneracion: "test-uuid-12345",
      tipoModelo: 1 as const,
      tipoOperacion: 1 as const,
      tipoContingencia: null,
      motivoContin: null,
      fecEmi: "2025-01-15",
      horEmi: "14:30:00",
      tipoMoneda: "USD"
    },
    emisor: {
      nit: "06142803901234",
      nrc: "123456",
      nombre: "Test Company S.A. de C.V.",
      codActividad: "01111",
      descActividad: "Cultivo de maíz",
      nombreComercial: "Test Store",
      tipoEstablecimiento: "01",
      direccion: {
        departamento: "01",
        municipio: "01",
        complemento: "Test Address 123"
      },
      telefono: "+50312345678",
      correo: "test@company.com",
      codEstableMH: "M001",
      codEstable: null,
      codPuntoVentaMH: "P001",
      codPuntoVenta: null
    },
    receptor: null,
    otrosDocumentos: null,
    ventaTercero: null,
    cuerpoDocumento: [
      {
        numItem: 1,
        tipoItem: 1 as const,
        numeroDocumento: null,
        cantidad: 1,
        codigo: null,
        codTributo: null,
        uniMedida: 59,
        descripcion: "Test Product",
        precioUni: 10.00,
        montoDescu: 0,
        ventaNoSuj: 0,
        ventaExenta: 0,
        ventaGravada: 10.00,
        tributos: null,
        psv: 0,
        noGravado: 0,
        ivaItem: 1.15
      }
    ],
    resumen: {
      totalNoSuj: 0,
      totalExenta: 0,
      totalGravada: 10.00,
      subTotalVentas: 10.00,
      descuNoSuj: 0,
      descuExenta: 0,
      descuGravada: 0,
      porcentajeDescuento: 0,
      totalDescu: 0,
      tributos: null,
      subTotal: 10.00,
      ivaRete1: 0,
      reteRenta: 0,
      montoTotalOperacion: 10.00,
      totalNoGravado: 0,
      totalPagar: 10.00,
      totalLetras: "DIEZ 00/100 DÓLARES",
      totalIva: 1.15,
      saldoFavor: 0,
      condicionOperacion: 1,
      pagos: [
        {
          codigo: "01",
          montoPago: 10.00,
          referencia: null,
          plazo: "01",
          periodo: 1
        }
      ],
      numPagoElectronico: null
    },
    extension: null,
    apendice: null
  },
  branchCode: "M001",
  posCode: "P001",
  documentType: "01"
};

console.log('curl -X POST "https://your-project.supabase.co/functions/v1/sign-dte" \\');
console.log('  -H "Authorization: Bearer your-anon-key" \\');
console.log('  -H "Content-Type: application/json" \\');
console.log(`  -d '${JSON.stringify(testPayload, null, 2)}'`);

console.log("\n📊 Expected Response:");
console.log(`{
  "result": { /* signed DTE with generated numeroControl */ },
  "controlNumber": "DTE-01-M001P001-000000000000001"
}`);

console.log("\n🔍 What to check:");
console.log("1. Control number follows format: DTE-01-M001P001-{15-digit-sequence}");
console.log("2. The numeroControl field in result.identificacion matches controlNumber");
console.log("3. Sequential calls increment the sequence number");
console.log("4. Different branch/POS combinations have independent counters");

console.log("\n🎯 Test Scenarios:");
console.log("- Run the same request multiple times to verify sequence increment");
console.log("- Change branchCode/posCode to test independent counters");
console.log("- Change documentType to test different document type counters");
console.log("- Test on January 1st to verify year-based reset");

console.log("\n📝 Manual Testing Steps:");
console.log("1. Deploy the function: supabase functions deploy sign-dte");
console.log("2. Set environment variables: MH_PASSWORD, NIT");
console.log("3. Upload your certificate to storage bucket");
console.log("4. Run the curl command above with your actual URL and API key");
console.log("5. Verify the generated control number format");
console.log("6. Run multiple times to test sequence increment");

console.log("\n✨ DTE Control Number Generation is ready for testing!"); 
