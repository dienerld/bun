import ExcelJS from "exceljs";
import { mapperColumns } from "./mapper-columns";

const workbook = new ExcelJS.Workbook();
// create spreadsheet
const sheet = workbook.addWorksheet("Sheet1", {
  views: [{ showGridLines: true, style: 'pageLayout', }],

});

const columns: Partial<ExcelJS.Column>[] = [
  {
    header: "Name", key: "name",
    style: {
      font: { bold: true, size: 12, color: { argb: "FF000000" } },
    },
  },
  {
    header: "Idade", key: "age", style: {
      font: { bold: true, size: 12, color: { argb: "FF000000" } },
    },
  },
  {
    header: "Sexo", key: 'gender', style: {
      font: { bold: true, size: 12, color: { argb: "FF000000" } },
    },
  },
  {
    header: "Endereço", key: "address", style: {
      font: { bold: true, size: 12, color: { argb: "FF000000" } },
    },
  },
  {
    header: "latitude", key: "lat", style: {
      numFmt: "0.000000", // melhorar a formatação
      font: { bold: true, size: 12, color: { argb: "FF000000" } },
    },
  },
  {
    header: "longitude", key: "lng", style: {
      numFmt: "0.000000",
      font: { bold: true, size: 12, color: { argb: "FF000000" } },
    },
  },
];
sheet.columns = columns;


sheet.insertRow(1, ["Relatório de posições - Placa: RYF8I86 | ID_Disp: 840083328 | Rótulo: MOTORISTA SERJÃO"]).eachCell((cell) => {
  cell.font = { bold: true, size: 24, color: { argb: 'FF000000' } };
  cell.alignment = { vertical: "middle", horizontal: "center" };
})
sheet.mergeCells(`A1:${mapperColumns(columns.length)}1`);


function AdjustColumnWidth(worksheet: ExcelJS.Worksheet) {

  worksheet.columns.forEach((column) => {
    if (!column.values) return;
    // `i` Forma para ignorar o registro do header e não usa-lo como referencia para o calculo do tamanho da coluna
    const lengths = column.values.map((v, i) => (v && i > 2 ? v.toString().length : 0));
    const maxLength = Math.max(...lengths.filter((v) => typeof v === "number"));
    const headerLength = column.header ? column.header.length : 0;

    column.width = Math.max(maxLength, headerLength) + 6;
  });
}

const rows: any[][] = [
  [
    "John Doe",
    25,
    "M",
    "COM GPS - R. PORTO VELHO, 1119 - INDUSTRIAL, LUCAS DO RIO VERDE - MT, 78455-000",
    -12.135847,
    -58.008802
  ],
  [
    "Jane Doe",
    25,
    "F",
    "COM GPS - R. PORTO VELHO, 1119 - INDUSTRIAL, LUCAS DO RIO VERDE - MT, 78455-000",
    -12.135847,
    -58.008802
  ],
  [
    "John Smith",
    40,
    "M",
    "COM GPS - R. PORTO VELHO, 1119 - INDUSTRIAL, LUCAS DO RIO VERDE - MT, 78455-000",
  ],
  [
    "Jane Smith",
    35,
    "F",
    "COM GPS - R. PORTO VELHO, 1119 - INDUSTRIAL, LUCAS DO RIO VERDE - MT, 78455-000",
    -12.135847,
    -58.008802
  ],
];

// add rows striped

rows.forEach((row, index) => {
  sheet.addRow(row).eachCell((cell) => {
    cell.style = {
      alignment: { vertical: "middle", horizontal: "left" },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: index % 2 === 0 ? "FFFFFFFF" : "FFDDDDDD" },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };
  });
});

AdjustColumnWidth(sheet);
// save file
workbook.xlsx.writeFile("example.xlsx").then(() => {
  console.log("File saved!");
});
