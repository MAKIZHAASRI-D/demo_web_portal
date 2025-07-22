/*import React, { useState } from 'react';

const ReportPage = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [records, setRecords] = useState([]);
  const [noData, setNoData] = useState(false);

  const fetchReport = async () => {
    setNoData(false);
    if (!fromDate || !toDate) return alert('Please select both dates.');

    const res = await fetch(`/api/report?from=${fromDate}&to=${toDate}`);
    const data = await res.json();

    if (data.length === 0) setNoData(true);
    setRecords(data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Production Report</h2>

      <div>
        <label>From: </label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <label> To: </label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button onClick={fetchReport}>Get Report</button>
      </div>

      {noData && <p style={{ color: 'red' }}>No data found for the selected range</p>}

      {records.length > 0 && (
        <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Operator</th>
              <th>Machine ID</th>
              <th>Total</th>
              <th>Accepted</th>
              <th>Rejected</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, idx) => (
              <tr key={idx}>
                <td>{new Date(rec.date).toLocaleDateString()}</td>
                <td>{rec.operatorName}</td>
                <td>{rec.machineId}</td>
                <td>{rec.totalMoulds}</td>
                <td>{rec.acceptedMoulds}</td>
                <td>{rec.rejectedMoulds}</td>
                <td>{rec.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportPage;
*/
/*
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportPage = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [records, setRecords] = useState([]);
  const [noData, setNoData] = useState(false);

  const fetchReport = async () => {
    setNoData(false);
    if (!fromDate || !toDate) return alert('Please select both dates.');

    try {
      const res = await fetch(`/api/report?from=${fromDate}&to=${toDate}`);
      const data = await res.json();
      if (data.length === 0) setNoData(true);
      setRecords(data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Operator', 'Machine ID', 'Total', 'Accepted', 'Rejected', 'Remarks'],
      ...records.map((rec) => [
        new Date(rec.date).toLocaleDateString(),
        rec.operatorName,
        rec.machineId,
        rec.totalMoulds,
        rec.acceptedMoulds,
        rec.rejectedMoulds,
        rec.remarks,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv';
    a.click();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      records.map((rec) => ({
        Date: new Date(rec.date).toLocaleDateString(),
        Operator: rec.operatorName,
        'Machine ID': rec.machineId,
        Total: rec.totalMoulds,
        Accepted: rec.acceptedMoulds,
        Rejected: rec.rejectedMoulds,
        Remarks: rec.remarks,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'report.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Production Report', 14, 10);
    const tableData = records.map((rec) => [
      new Date(rec.date).toLocaleDateString(),
      rec.operatorName,
      rec.machineId,
      rec.totalMoulds,
      rec.acceptedMoulds,
      rec.rejectedMoulds,
      rec.remarks,
    ]);
    doc.autoTable({
      head: [['Date', 'Operator', 'Machine ID', 'Total', 'Accepted', 'Rejected', 'Remarks']],
      body: tableData,
    });
    doc.save('report.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Production Report</h2>

      <div>
        <label>From: </label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <label> To: </label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button onClick={fetchReport}>Get Report</button>
      </div>

      {noData && <p style={{ color: 'red' }}>No data found for the selected range</p>}

      {records.length > 0 && (
        <>
          <div style={{ marginTop: '20px' }}>
            <button onClick={exportToCSV}>Download CSV</button>
            <button onClick={exportToExcel}>Download Excel</button>
            <button onClick={exportToPDF}>Download PDF</button>
          </div>

          <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Operator</th>
                <th>Machine ID</th>
                <th>Total</th>
                <th>Accepted</th>
                <th>Rejected</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, idx) => (
                <tr key={idx}>
                  <td>{new Date(rec.date).toLocaleDateString()}</td>
                  <td>{rec.operatorName}</td>
                  <td>{rec.machineId}</td>
                  <td>{rec.totalMoulds}</td>
                  <td>{rec.acceptedMoulds}</td>
                  <td>{rec.rejectedMoulds}</td>
                  <td>{rec.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ReportPage;
*/

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ReportPage = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [records, setRecords] = useState([]);
  const [noData, setNoData] = useState(false);

  const fetchReport = async () => {
    setNoData(false);
    if (!fromDate || !toDate) return alert('Please select both dates.');

    const res = await fetch(`/api/report?from=${fromDate}&to=${toDate}`);
    const data = await res.json();

    if (data.length === 0) setNoData(true);
    setRecords(data);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Operator', 'Machine ID', 'Total', 'Accepted', 'Rejected', 'Remarks'],
      ...records.map((rec) => [
        new Date(rec.date).toLocaleDateString(),
        rec.operatorName,
        rec.machineId,
        rec.totalMoulds,
        rec.acceptedMoulds,
        rec.rejectedMoulds,
        rec.remarks,
      ]),
    ];

    const csv = csvContent.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'production_report.csv';
    link.click();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      records.map((rec) => ({
        Date: new Date(rec.date).toLocaleDateString(),
        Operator: rec.operatorName,
        MachineID: rec.machineId,
        Total: rec.totalMoulds,
        Accepted: rec.acceptedMoulds,
        Rejected: rec.rejectedMoulds,
        Remarks: rec.remarks,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'production_report.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Date', 'Operator', 'Machine ID', 'Total', 'Accepted', 'Rejected', 'Remarks']],
      body: records.map((rec) => [
        new Date(rec.date).toLocaleDateString(),
        rec.operatorName,
        rec.machineId,
        rec.totalMoulds,
        rec.acceptedMoulds,
        rec.rejectedMoulds,
        rec.remarks,
      ]),
    });
    doc.save('production_report.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Production Report</h2>

      <div>
        <label>From: </label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <label> To: </label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button onClick={fetchReport}>Get Report</button>
      </div>

      {noData && <p style={{ color: 'red' }}>No data found for the selected range</p>}

      {records.length > 0 && (
        <>
          <div style={{ marginTop: '20px' }}>
            <button onClick={exportToCSV}>Download CSV</button>
            <button onClick={exportToExcel}>Download Excel</button>
            <button onClick={exportToPDF}>Download PDF</button>
          </div>

          <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Operator</th>
                <th>Machine ID</th>
                <th>Total</th>
                <th>Accepted</th>
                <th>Rejected</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, idx) => (
                <tr key={idx}>
                  <td>{new Date(rec.date).toLocaleDateString()}</td>
                  <td>{rec.operatorName}</td>
                  <td>{rec.machineId}</td>
                  <td>{rec.totalMoulds}</td>
                  <td>{rec.acceptedMoulds}</td>
                  <td>{rec.rejectedMoulds}</td>
                  <td>{rec.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ReportPage;
