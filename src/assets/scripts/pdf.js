import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import bsuLogo from '@/assets/logos/bulsu-logo.png'
import conLogo from '@/assets/logos/CON-logo.png'

export default function generatePDF(name, category, caseNo, timesTaken, dateHandled, scores) {
  let tableHeight
  let bulsuImg = new Image()
  let conImg = new Image()
  bulsuImg.src = bsuLogo
  conImg.src = conLogo

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'cm',
    format: 'legal'
  })

  let pageWidth = doc.internal.pageSize.getWidth()

  doc.setFontSize(12)
  doc.setFont('times')

  doc.addImage(bulsuImg, 'PNG', pageWidth / 2 - 5, 1.25, 2, 2)
  doc.text('Bulacan State University\nCOLLEGE OF NURSING\nCity of Malolos, Bulacan', pageWidth / 2, 2, { align: 'center' })
  doc.addImage(conImg, 'PNG', pageWidth / 2 + 3, 1.25, 2, 2)

  doc.text('NURSING CARE PLAN', pageWidth / 2, 4, { align: 'center' })

  doc.setFont(undefined, 'bold').text(`Name: ${name}        Category: ${category}        Case ID: ${caseNo}`, 2, 5)
  doc.setFont(undefined, 'bold').text(`Times Taken: ${timesTaken}        Date Handled: ${dateHandled}`, pageWidth - 2, 5, { align: 'right' })

  doc.autoTable({
    html: '#table',
    includeHiddenHtml: true,
    useCss: true,
    startY: 5.5,
    margin: 1.5,
    columnStyles: {
      0: {
        cellWidth: 32.56 / 6
      },
      1: {
        cellWidth: 32.56 / 6
      },
      2: {
        cellWidth: 32.56 / 6
      },
      3: {
        cellWidth: 32.56 / 6
      },
      4: {
        cellWidth: 32.56 / 6
      },
      5: {
        cellWidth: 32.56 / 6
      }
    },
    didDrawPage: (d) => (tableHeight = d.cursor.y)
  })

  doc
    .setFont(undefined, 'italic')
    .text(
      `Assessment - ${scores[0]}%        Nursing Diagnosis - ${scores[1]}%        Planning - ${scores[2]}%        Intervention - ${scores[3]}%        Evaluation - ${scores[4]}%        Overall - ${scores[5]}%`,
      pageWidth / 2,
      tableHeight + 0.75,
      { align: 'center' }
    )

  window.open(doc.output('bloburl'))
}
