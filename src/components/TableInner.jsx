"use client";

import React, { useState } from "react";

const TableInner = ({ initialText = "" }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialText);

  return (
    <div className="table-inner">
      {editing ? (
        <>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setEditing(false)}
          />
        </>
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          {value || <em>Double‑click to edit</em>}
        </div>
      )}
    </div>
  );
};

export default TableInner;
