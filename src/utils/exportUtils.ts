export const downloadTemplate = () => {
  const headers = [
    'Employee',
    'Lead Source',
    'Mobile',
    'Company Name',
    'Person',
    'Email',
    'Lead Type',
    'Address',
    'Remark',
    'Date',
    'Time',
    'Call Duration'
  ];

  const csvContent = headers.join(',');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'lead-template.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};

export const exportLeads = (leads: any[]) => {
  const headers = [
    'Employee',
    'Lead Source',
    'Mobile',
    'Company Name',
    'Person',
    'Email',
    'Lead Type',
    'Address',
    'Remark',
    'Date',
    'Time',
    'Call Duration'
  ];

  const csvContent = [
    headers.join(','),
    ...leads.map(lead => [
      lead.employee,
      lead.leadSource,
      lead.mobile,
      lead.companyName,
      lead.person,
      lead.email,
      lead.leadType,
      lead.address,
      lead.remark,
      lead.date,
      lead.time,
      lead.callDuration
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};