// Add these interfaces to your existing types
export interface FollowUp {
  id: string;
  leadId: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'successful' | 'failed' | 'hold' | 'not-interested';
  nextFollowUpDate: string;
}

export interface Lead {
  id: string;
  employee: string;
  leadSource: string;
  mobile: string;
  companyName: string;
  person: string;
  email: string;
  leadType: string;
  address: string;
  remark: string;
  date: string;
  time: string;
  callDuration: string;
  assignedTo: string | null;
  status: 'pending' | 'successful' | 'failed' | 'hold' | 'not-interested';
  followUps: FollowUp[];
}