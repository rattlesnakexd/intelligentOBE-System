import React from "react";
import "./table.css";

function Table({ columns, data, checkBox }) {
  return (
    <table>
      <thead>
        <tr>
          {checkBox && <th></th>} {/* Render the checkbox column only when checkBox is true */}
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {checkBox && ( /* Render the checkbox cell only when checkBox is true */
              <td>
                <input type="checkbox" />
              </td>
            )}
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
