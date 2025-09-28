"use client";

import React from "react";

const TableInfo = () => {
  const API_BASE = "http://20.244.17.254/qcapp";

  // Get current date for display
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/download_all_reports/`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "No reports available");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reports.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed: " + (err.message || err));
    }
  };

  // Sample data for the table
  const tableData = [
    {
      id: 1,
      fileName: "NAIBHF00000904.pdf",
      fileLink: "/table-inner.html",
      qcStatus: "Pending",
      checksum: "10e121471c9bd048459e469e7b3f658638e25f",
      inCompliance: "TRUE",
      originalPages: 10,
      totalPages: 24,
      highResPrint: "TRUE",
      accessibility: "FALSE",
      extract: "FALSE",
      modifyAnnotations: "FALSE",
      modifyForms: "FALSE",
      modifyAssembly: "FALSE",
      modifyOther: "FALSE",
    },
    {
      id: 2,
      fileName: "NAIBHF00000908.pdf",
      fileLink: "/table-inner_2.html",
      qcStatus: "Pending",
      checksum: "20f232582cae15957a6a57b8c4g769749f36g",
      inCompliance: "TRUE",
      originalPages: 10,
      totalPages: 24,
      highResPrint: "TRUE",
      accessibility: "FALSE",
      extract: "FALSE",
      modifyAnnotations: "FALSE",
      modifyForms: "FALSE",
      modifyAssembly: "FALSE",
      modifyOther: "FALSE",
    },
    {
      id: 3,
      fileName: "NAIBHF00000917.pdf",
      fileLink: "/table-inner_3.html",
      qcStatus: "Pending",
      checksum: "30g343693dbf26a68b7b68c9d5h87085ag47h",
      inCompliance: "TRUE",
      originalPages: 10,
      totalPages: 24,
      highResPrint: "TRUE",
      accessibility: "FALSE",
      extract: "FALSE",
      modifyAnnotations: "FALSE",
      modifyForms: "FALSE",
      modifyAssembly: "FALSE",
      modifyOther: "FALSE",
    },
  ];

  return (
    <div className="container">
      <div className="wrap pb-5" role="main" aria-label="Batch Quality Report">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center download-data-file">
            <h1>Batch Quality Report</h1>
            <div>
              <a
                href="/pdf/QC_20250801DL.pdf"
                download="QC_20250801DL.pdf"
                className="Download-All allPass me-2"
              >
                Download Report
              </a>
              <a
                href="/pdf/QC_202508013DL.pdf"
                download="QC_202508013DL.pdf"
                className="Download-All last-reject"
              >
                Download Report
              </a>
            </div>
          </div>
          <div className="sub mb-3">
            Batch: <strong>20250801DL</strong>
          </div>
          <span className="badge ok orange" id="head-indicator">
            Pending
          </span>
          <span className="badge">{currentDate}</span>
        </div>

        <section aria-labelledby="meta">
          <h2 id="meta">PDF Validation</h2>
          <div className="table-responsive">
            <table
              className="tbl table"
              aria-describedby="meta"
              id="quality-report-table"
            >
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>File Name</th>
                  <th>QC Check</th>
                  <th>Checksum</th>
                  <th>In Compliance</th>
                  <th>Original Document Pages</th>
                  <th>Total Pages</th>
                  <th>High Resolution Print</th>
                  <th>Accessibility</th>
                  <th>Extract</th>
                  <th>Modify Annotations</th>
                  <th>Modify Forms</th>
                  <th>Modify Assembly</th>
                  <th>Modify Other</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                      <a href={row.fileLink}>{row.fileName}</a>
                    </td>
                    <td className="checkbox-cell">
                      <span
                        className={`pass-checkbox ${
                          row.qcStatus === "Pending" ? "orange" : ""
                        }`}
                        data-pdf-name={row.fileName.replace(".pdf", "")}
                      >
                        {row.qcStatus}
                      </span>
                    </td>
                    <td>{row.checksum}</td>
                    <td>{row.inCompliance}</td>
                    <td>{row.originalPages}</td>
                    <td>{row.totalPages}</td>
                    <td>{row.highResPrint}</td>
                    <td>{row.accessibility}</td>
                    <td>{row.extract}</td>
                    <td>{row.modifyAnnotations}</td>
                    <td>{row.modifyForms}</td>
                    <td>{row.modifyAssembly}</td>
                    <td>{row.modifyOther}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer>Report generated by DJINN.AI QC System on {currentDate}</footer>
      </div>
    </div>
  );
};

export default TableInfo;
