<script setup>
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import bsuLogo from '@/assets/logos/bulsu-logo.png'
import conLogo from '@/assets/logos/CON-logo.png'

const rows = {
  name: 'Jan Roe Bantuan',
  section: '4K',
  category: 'Neuro',
  caseNo: '3',
  timesTaken: '4',
  dateHandled: '12/25/2023 @ 7:00pm'
}

function generatePDF(name, category, caseNo, timesTaken, dateHandled) {
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

  doc.setFont(undefined, 'bold').text(`Name: ${name}        Category: ${category}        Case No: ${caseNo}`, 2, 5)
  doc.setFont(undefined, 'bold').text(`No. of Times Taken: ${timesTaken}        Date Handled: ${dateHandled}`, pageWidth - 2, 5, { align: 'right' })

  doc.autoTable({
    html: '#table',
    includeHiddenHtml: true,
    useCss: true,
    startY: 5.5,
    margin: 1.5,
    columnStyles: {
      0: {
        columnWidth: 32.56 / 6
      },
      1: {
        columnWidth: 32.56 / 6
      },
      2: {
        columnWidth: 32.56 / 6
      },
      3: {
        columnWidth: 32.56 / 6
      },
      4: {
        columnWidth: 32.56 / 6
      },
      5: {
        columnWidth: 32.56 / 6
      }
    }
  })

  let blob = doc.output('blob')
  window.open(URL.createObjectURL(blob))
}
</script>

<template>
  <div class="sticky top-[61px] flex flex-row items-center gap-2 bg-blue-50 px-4 py-2">
    <VFormTextbox placeholder="Name, category etc." class="w-72" />

    <VSelect name="class_section" :options="['1A', '1B', '1C', '1D']" class="w-20" />

    <VButton>
      <span class="material-icons"> search </span>
      Search
    </VButton>
  </div>
  <table class="w-full table-fixed">
    <tr class="sticky top-[119px] bg-blue-200">
      <th class="w-16">#</th>
      <th class="px-6 py-4 text-start">Name</th>
      <th class="px-6 py-4 text-start">Section</th>
      <th class="px-6 py-4 text-start">Category</th>
      <th class="px-6 py-4 text-start">Case #</th>
      <th class="px-6 py-4 text-start">Times Taken</th>
      <th class="px-6 py-4 text-start">Date Handled</th>
      <th class="px-6 py-4">Action</th>
    </tr>
    <tr v-for="x in 200" :key="x" class="text-center odd:bg-blue-100">
      <td class="w-16 text-center">{{ x }}</td>
      <td class="max-w-[200px] truncate px-6 py-1 text-start">{{ rows.name }}</td>
      <td class="px-6 py-1 text-start">{{ rows.section }}</td>
      <td class="px-6 py-1 text-start">{{ rows.category }}</td>
      <td class="px-6 py-1 text-start">{{ rows.caseNo }}</td>
      <td class="px-6 py-1 text-start">{{ rows.timesTaken }}</td>
      <td class="px-6 py-1 text-start">{{ rows.dateHandled }}</td>
      <td class="px-6 py-1">
        <VButton @click="generatePDF(rows.name, rows.category, rows.caseNo, rows.timesTaken, rows.dateHandled)" color="success">
          <span class="material-icons"> print </span>
          NCP
        </VButton>
      </td>
    </tr>
  </table>

  <!-- for pdf generation -->
  <table class="hidden w-full table-fixed border-collapse border border-black bg-white font-['Times'] text-[15px] text-black" id="table">
    <tr>
      <th class="border border-black px-2 pb-6 pt-2 text-center">Assessment</th>
      <th class="border border-black px-2 pb-6 pt-2 text-center">Nursing Diagnosis</th>
      <th class="border border-black px-2 pb-6 pt-2 text-center">Planning</th>
      <th class="border border-black px-2 pb-6 pt-2 text-center">Intervention</th>
      <th class="border border-black px-2 pb-6 pt-2 text-center">Rationale</th>
      <th class="border border-black px-2 pb-6 pt-2 text-center">Evaluation</th>
    </tr>
    <tr>
      <td class="border border-black px-4 py-2 text-start align-top">
        Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd
      </td>
    </tr>
  </table>
</template>

<style scoped></style>
