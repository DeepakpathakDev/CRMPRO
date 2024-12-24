import React from 'react';

const HEADERS = [
  'S.No',
  'Name',
  'Email',
  'Phone',
  'Date',
  'Type',
  'Group',
  'Employee Id',
  'Performance',
  'Actions'
];

export function TableHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        {HEADERS.map((header) => (
          <th
            key={header}
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}