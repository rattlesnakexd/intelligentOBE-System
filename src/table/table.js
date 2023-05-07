import React from "react";
import "./table.css"

function Table({ columns, data }) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              <input type="checkbox" />
            </td>
            {columns.map((column, index) => (
              <td key={index}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
