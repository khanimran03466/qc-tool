import React from "react";

const BatchSummary = () => {
  return (
    <>
      {/* Report Section (initially hidden) */}
      <div id="report-section" className="tab-content">
        <div className="head-wraper">
          <h1>Batch Summary</h1>
          {/* <button type="button" className="Download-All">Download All</button> */}
        </div>

        <div className="table-wrap">
          <table className="qc-table">
            <thead>
              <tr>
                <th>Batch Name</th>
                <th>
                  <button className="img-button text-white">
                    QC Processing Date
                    <img
                      className="arrow-img"
                      src="img/arrow.png"
                      alt="Sort Arrow"
                    />
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
              <tr>
                <td data-label="File Name:">
                  <h5>20250802DL</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Saturday, 16 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>200</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250804BH</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Sunday, 17 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>150</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250805PY</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Monday, 18 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>120</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250806BL</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Tuesday, 19 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>180</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250807BL</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Wednesday, 20 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>210</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250808DL</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Thursday, 21 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>300</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250809PY</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Friday, 22 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>250</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250810BH</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Saturday, 23 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>310</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250811BH</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Sunday, 24 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>215</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250812BH</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Monday, 25 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>190</h5>
                </td>
                <td>
                  <a href="/table-info.html"> View Batch </a>
                </td>
              </tr>
              <tr>
                <td data-label="File Name:">
                  <h5>20250813PY</h5>
                </td>
                <td data-label="QC Processing Date:">
                  <h5>Tuesday, 26 August 2025</h5>
                </td>
                <td data-label="Size (KB)">
                  <h5>350</h5>
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
    </>
  );
};

export default BatchSummary;
