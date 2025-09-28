import Link from "next/link";
import React from "react";

const LeftPannel = () => {
  return (
    <>
      <div className="left-wrap">
        <div className="left-section">
          <ul className="row-section">
            <li className="active" data-tab="upload">
              <img src="/img/cloud-computing.png" alt="cloud-computing" />
              Upload Batch
            </li>
            <li data-tab="report">
              <Link href="/batch-summary">
                <img src="/img/report.png" alt="report" />
                Batch Summary
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeftPannel;
