import ExcelJS from 'exceljs'

const workbook = new ExcelJS.Workbook()
// create spreadsheet
const sheet = workbook.addWorksheet('Sheet1', {
  views: [{ showGridLines: true }]
})


function AdjustColumnWidth(worksheet: ExcelJS.Worksheet) {
  worksheet.columns.forEach(column => {
    if (!column.values) return;
    const lengths = column.values.map(v => v ? v.toString().length : 0);
    const maxLength = Math.max(...lengths.filter(v => typeof v === 'number'));
    const headerLength = column.header ? column.header.length : 0;

    column.width = Math.max(maxLength, headerLength) + 2;
  });
}

// // create header row with backgorund color
// sheet.addRow(['Name', 'Idade', 'Sexo', 'endereco']).eachCell((cell) => {
//   cell.fill = {
//     type: 'pattern',
//     pattern: 'solid',
//     fgColor: { argb: 'FF0000' },
//   }
// })
sheet.columns = [
  { header: 'Name', key: 'name' },
  { header: 'Idade', key: 'age' },
  { header: 'sexo', key: 'genre' },
  { header: 'endereco', key: 'address', },
]

sheet.eachRow((row) => {
  row.eachCell((cell) => {
    cell.style = {
      alignment: { vertical: 'middle', horizontal: 'center' },
      font: { bold: true },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF0000' },
      },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    }
  })
})

const rows: [][] = [
  ['John Doe', 30, 'M', 'COM GPS - R. PORTO VELHO, 1119 - INDUSTRIAL, LUCAS DO RIO VERDE - MT, 78455-000'],
  ['Jane Doe', 25, 'F', 'COM GPS - R. PORTO VELHO, 1119 - INDUSTRIAL, LUCAS DO RIO VERDE - MT, 78455-000'],
  ['John Smith', 40, 'M', 'COM GPS - R. PORTO VELHO, 1119 - INDUSTRIAL, LUCAS DO RIO VERDE - MT, 78455-000'],
  ['Jane Smith', 35, 'F', 'COM GPS - R. PORTO VELHO, 1119 - INDUSTRIAL, LUCAS DO RIO VERDE - MT, 78455-000'],
]

// add rows striped

rows.forEach((row, index) => {
  const rowNumber = index + 2
  sheet.addRow(row).eachCell((cell) => {
    cell.style = {
      alignment: { vertical: 'middle', horizontal: 'left' },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: index % 2 === 0 ? 'FFFFFF' : 'DDDDDD' },
      },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    }
  })
})

AdjustColumnWidth(sheet)
// save file
workbook.xlsx.writeFile('example.xlsx').then(() => {
  console.log('File saved!')
})
