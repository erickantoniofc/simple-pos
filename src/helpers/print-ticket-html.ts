import type { Sale } from "@/data/types/sale";
import { DocumentType } from "@/data/types/sale";

export const printTicketHtml = (sale: Sale) => {
  if (!sale) return;

  const isFE = sale.documentType === DocumentType.FE;
  const docLabel = isFE ? "Factura Electrónica" : "Crédito Fiscal";
  const cliente = sale.customer;

  const html = `
  <html>
    <head>
      <style>
        @media print {
          body {
            width: 58mm;
            font-family: monospace;
            font-size: 10px;
            margin: 0;
            padding: 0;
          }

          .ticket {
            width: 100%;
            padding: 8px;
          }

          .center {
            text-align: center;
          }

          .bold {
            font-weight: bold;
          }

          .line {
            border-top: 1px dashed #000;
            margin: 4px 0;
          }

          .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
          }

          .item .qty {
            width: 20%;
          }

          .item .name {
            width: 50%;
            overflow: hidden;
            white-space: nowrap;
          }

          .item .total {
            width: 30%;
            text-align: right;
          }
        }
      </style>
    </head>
    <body onload="window.print(); window.close();">
      <div class="ticket">
        <div class="center bold">${docLabel}</div>
        <div class="center">#${sale.documentNumber}</div>
        <div class="center">${sale.date ?? ""}</div>

        <div class="line"></div>

        <div><strong>Cliente:</strong> ${cliente?.name ?? "Consumidor Final"}</div>
        ${cliente?.dui ? `<div><strong>DUI:</strong> ${cliente.dui}</div>` : ""}
        ${cliente?.nrc ? `<div><strong>NRC:</strong> ${cliente.nrc}</div>` : ""}
        ${cliente?.address ? `<div><strong>Dirección:</strong> ${cliente.address}</div>` : ""}

        <div class="line"></div>

        ${sale.saleItems
          .map(
            (item) => `
          <div class="item">
            <div class="qty">${item.quantity}x</div>
            <div class="name">${item.product.name}</div>
            <div class="total">$${item.total.toFixed(2)}</div>
          </div>
        `
          )
          .join("")}

        <div class="line"></div>

        <div class="item bold">
          <div class="name">TOTAL</div>
          <div class="total">$${sale.total.toFixed(2)}</div>
        </div>

        <div class="center">¡Gracias por su compra!</div>
      </div>
    </body>
  </html>
  `;

  const printWindow = window.open("", "_blank", "width=400,height=600");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }
};