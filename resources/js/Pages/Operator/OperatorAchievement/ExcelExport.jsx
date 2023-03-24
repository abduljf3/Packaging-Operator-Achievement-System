import Excel from 'exceljs';

export function exportToExcel(data, filename) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');
  worksheet.addRow(['Name', 'Email']);

  data.forEach((item) => {
    worksheet.addRow([item.name, item.email]);
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename + '.xlsx';
    link.click();
  });
}