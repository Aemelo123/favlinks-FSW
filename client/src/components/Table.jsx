import React from 'react';

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

const TableBody = (props) => {
  const rows = props.linkData ? props.linkData.map((row, index) => (
    <tr key={index}>
      <td>{row.name}</td>
      <td>
        <a href={row.URL}>{row.URL}</a>
      </td>
      <td>
        {/* Add button with onClick to call props.removeLink */}
        <button onClick={() => props.removeLink(index)}>Delete</button>
      </td>
    </tr>
  )) : [];

  return <tbody>{rows}</tbody>;
};


function Table(props) {
  return (
    <table>
      <TableHeader />
      {/* Pass removeLink function to TableBody */}
      <TableBody linkData={props.linkData} removeLink={props.removeLink} />
    </table>
  );
}

export default Table;
