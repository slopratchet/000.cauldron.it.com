export type SessionStatus = 'SUCCESS' | 'SYNCED' | 'ALERT' | 'FAILURE';

export interface SessionLog {
  id: string;
  date: string;
  theater: string;
  play: string;
  seat: string;
  notes: string;
  status: SessionStatus;
}

export interface Seat {
  id: string; // e.g., "G-01", "G-02" ...
  status: 'OCCUPIED' | 'VACANT';
  sessionId?: string; // Associated session if occupied
  url?: string; // Web page link when clicked
}

export interface SystemLogEntry {
  timestamp: string;
  text: string;
  type: 'INFO' | 'WARNING' | 'ALERT' | 'SUCCESS';
}
