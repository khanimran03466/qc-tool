"use client";

import React, { useRef, useState, useEffect } from "react";

const RightSsection = () => {
  const fileInputRef = useRef(null);
  const stopPollRef = useRef(null);
  const [filesList, setFilesList] = useState([]);
  const [status, setStatus] = useState({
    uploading: false,
    processing: false,
    progress: 0,
    batchId: null,
  });

  const API_BASE = "http://20.244.17.254/qcapp";

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setFilesList(files);
  };

  const uploadFiles = async (files) => {
    if (!files || files.length === 0) {
      throw new Error("No files to upload");
    }
    const fd = new FormData();
    files.forEach((f) => fd.append("pdf_files[]", f));
    const res = await fetch(`${API_BASE}/upload_files/`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Upload failed");
    }
    return res.json();
  };

  const startProcessing = async () => {
    const res = await fetch(`${API_BASE}/process_pdf/`, { method: "POST" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Processing request failed");
    }
    return res.json();
  };

  const pollBatchStatus = (batchId, onUpdate) => {
    let stopped = false;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/check_batch_status/${batchId}/`);
        if (!res.ok) throw new Error("Failed to fetch batch status");
        const data = await res.json();
        onUpdate(data);
        if ((data.progress ?? 0) >= 100 || (data.completed >= data.total && data.total > 0)) {
          clearInterval(interval);
          stopped = true;
        }
      } catch (err) {
        clearInterval(interval);
        stopped = true;
        onUpdate({ error: err.message });
      }
    }, 2000);
    return () => {
      if (!stopped) clearInterval(interval);
    };
  };

  useEffect(() => {
    return () => {
      // cleanup polling on unmount
      if (typeof stopPollRef.current === "function") {
        stopPollRef.current();
      }
    };
  }, []);

  const handlePerformQC = async () => {
    if (filesList.length === 0) {
      alert("Please select PDF files or a folder first.");
      return;
    }

    try {
      setStatus((s) => ({ ...s, uploading: true }));
      await uploadFiles(filesList);
      setStatus((s) => ({ ...s, uploading: false, processing: true, progress: 0 }));

      const procRes = await startProcessing();
      const batchId = procRes.batch_id || procRes.batchId || null;
      setStatus((s) => ({ ...s, batchId }));

      if (!batchId) {
        setStatus((s) => ({ ...s, processing: false, progress: 100 }));
        alert(procRes.message || "Processing request returned no batch id.");
        return;
      }

      // start polling
      stopPollRef.current = pollBatchStatus(batchId, (data) => {
        if (data.error) {
          setStatus((s) => ({ ...s, processing: false }));
          alert("Error checking batch status: " + data.error);
          return;
        }
        const progress =
          typeof data.progress === "number"
            ? data.progress
            : Math.round((data.completed / Math.max(1, data.total)) * 100);
        setStatus((s) => ({ ...s, progress }));
        if (progress >= 100 || (data.completed >= data.total && data.total > 0)) {
          setStatus((s) => ({ ...s, processing: false, progress: 100 }));
          alert("Batch processing complete. You can view reports in Batch Summary.");
        }
      });
    } catch (err) {
      setStatus({ uploading: false, processing: false, progress: 0, batchId: null });
      alert("Error: " + (err.message || err));
    }
  };

  return (
    <div className="right-section">
      <div className="main-section">
        <div id="upload-section" className="tab-content">
          <h1>Upload Batch</h1>
          <div className="drag-section">
            <div className="drag-wrap" id="drop-area">
              <div className="wrapper browse-link">
                <img src="/img/drag.png" alt="drag-img" />
                <div className="word-wrap">
                  <p
                    className="font"
                    style={{
                      userSelect: "none",
                      pointerEvents: "none",
                      cursor: "default",
                    }}
                  >
                    To process your batch&nbsp;
                    <span
                      className="color-blue browse-link"
                      onClick={handleBrowseClick}
                      style={{ cursor: "pointer", pointerEvents: "auto" }}
                    >
                      Browse to Upload
                    </span>
                  </p>
                  <span className="small-font font">Supports: Folder, PDF</span>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                id="fileInput"
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFileChange}
              />

              <div id="file-list" style={{ marginTop: "15px" }}>
                {filesList.length === 0 ? (
                  <em>No files selected</em>
                ) : (
                  <ul>
                    {filesList.map((f, i) => (
                      <li key={i}>
                        {f.name} <small>({Math.round(f.size / 1024)} KB)</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="button-sec analyse-btn browse-link">
            <button
              type="button"
              id="qc-perform-button"
              className="gradient"
              onClick={handlePerformQC}
              disabled={status.uploading || status.processing}
            >
              <img
                src="/img/smile.png"
                alt="Loading"
                style={{
                  width: "18px",
                  height: "18px",
                  verticalAlign: "middle",
                  marginRight: "8px",
                }}
              />
              {status.uploading ? "Uploading..." : status.processing ? `Processing (${status.progress}%)` : "Perform QC"}
            </button>
          </div>
        </div>

        <div id="report-section" className="tab-content">
          <div className="head-wraper">
            <h1>Batch Summary</h1>
          </div>

          <div className="table-wrap">
            <table className="qc-table">
              <thead>
                <tr>
                  <th>Batch Name</th>
                  <th>
                    <button className="img-button text-white">
                      QC Processing Date
                      <img className="arrow-img" src="/img/arrow.png" alt="Sort Arrow" />
                    </button>
                  </th>
                  <th>Size (GB)</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td data-label="File Name:">
                    <h5>20250801DL</h5>
                  </td>
                  <td data-label="QC Processing Date:">
                    <h5>Thursday, 25 September 2025</h5>
                  </td>
                  <td data-label="Size (GB)">
                    <h5>0.50</h5>
                  </td>
                  <td>
                    <a href="/table-info.html"> View Batch </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="wraper-pagination">
              <p>Showing 1- 18 of 200 </p>
              <div className="pagination-container">
                <ul id="customPagination" className="custom-pagination"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade browse-link"
        id="myModal"
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-size">
          <div className="modal-content ">
            <div className="modal-body">
              Your Batch is successfully processed.
              <p>Click below to view</p>
              <div className="modal-footer okay">
                <a href="/table-info.html" type="button" className="btn-okay">
                  View
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSsection;
