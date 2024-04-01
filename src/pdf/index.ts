// Importando as bibliotecas
import autoTable, { type CellDef } from 'jspdf-autotable';
import jsPDF from 'jspdf';


const columns: {
  name: string,
  label: string
}[] = [{
  name: 'plate',
  label: 'Placa'
}, {
  name: 'date',
  label: 'Data'
}, {
  name: 'drivers',
  label: 'Motoristas'
}, {
  name: 'comments',
  label: 'Comentários'
}, {
  name: 'events',
  label: 'Eventos'
}, {
  name: 'lat',
  label: 'Latitude'
}, {
  name: 'lng',
  label: 'Longitude'
},
{
  name: 'address',
  label: 'Endereço'
},
{
  name: 'startAtEvent',
  label: 'Início no Evento'
},
{
  name: 'endAtEvent',
  label: 'Fim no Evento'
}
  ]
type Data = {
  plate: string,
  date: string,
  drivers: string,
  comments: string,
  events: string,
  lat: string,
  lng: string,
  address?: string
  startAtEvent?: string
  endAtEvent?: string
}

const based: Data[] = [
  {
    plate: 'ABC-1234',
    date: '01/01/2021',
    drivers: 'João, Maria',
    comments: 'Comentário',
    events: 'Evento',
    lat: '-23.550520',
    lng: '-46.633308',
    address: 'Rua A, 123',
    startAtEvent: 'Evento Inicial',
    endAtEvent: 'Evento Final'
  },
  {
    plate: 'DEF-5678',
    date: '01/01/2021',
    drivers: 'João, Maria',
    comments: 'Bateria Principal Desconectada',
    events: 'Evento',
    lat: '-23.550520',
    lng: '-46.633308'
  },
  {
    plate: 'GHI-9101',
    date: '01/01/2021',
    drivers: 'João, Maria',
    comments: 'Remocao da Bateria Principal',
    events: 'Evento',
    lat: '-23.550520',
    lng: '-46.633308',
    address: 'Rua A, 123',
    startAtEvent: 'Evento Inicial',
    endAtEvent: 'Evento Final'
  }

]
const users = Array.from({ length: 100 }, (_, i) => based[i % 3])

// Criando uma nova instância do jsPDF no formato retrato
var doc = new jsPDF('landscape', 'px', 'a4');

function setColumn({ label, name }: { label: string, name: string }): CellDef {
  const width: Record<string, number> = {

  }


  return {
    content: label,
    styles: {
      fillColor: [0, 0, 0],
      cellWidth: width[name],
      overflow: 'linebreak',
    }
  }

}


// Definindo os dados da tabela
var head: CellDef[][] = [columns.map(setColumn)]




function makeLine(data: Data) {
  return [
    { content: data.plate },
    { content: data.date },
    { content: data.drivers },
    { content: data.comments },
    { content: data.events },
    { content: data.lat },
    { content: data.lng },
    { content: data.address ?? ''},
    { content: data.startAtEvent?? ''},
    { content: data.endAtEvent?? ''}

  ]
}

const path = `${__dirname}/logo-orange.png`;
const file = Bun.file(path);
const arrBuffer = await file.arrayBuffer();
const byteArray = new Uint8Array(arrBuffer);

function setPage(data: any) {
  data.doc.setFontSize(10);
  data.doc.text(
    `Page ${data.pageNumber}`,
    data.doc.internal.pageSize.width - 50
    , data.doc.internal.pageSize.height - 10);
}

function setHeader(data: any) {
  data.doc.setFontSize(10);
  data.doc.addImage(byteArray, 'PNG', 40, 20, 100, 20);
  data.doc.text('4all Tecnologia - Rua A, 123, São Paulo - SP', 200, 35);
}


autoTable(doc, {
  head: head,
  body: users.map(makeLine),
  margin: { top: 60 },
  theme: 'striped',
  tableWidth: 'auto',
  pageBreak: 'auto',
  showHead: 'everyPage',
  // set page of total number bottom right
  didDrawPage: function (data) {
    setPage(data);
    setHeader(data);
  }
});


// add header all pages with image and info company
// doc.addImage('https://www.4all.com/wp-content/uploads/2020/04/4all-logo.svg', 'PNG', 10, 10, 50, 50);


doc.save('table.pdf');
// Bun.serve({
//   port: 8084,
//   fetch: async (req) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     // return to user preview of pdf

//     return new Response(doc.output('arraybuffer'), {
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'inline; filename="table.pdf"'
//       }
//     });
//   }
// })
