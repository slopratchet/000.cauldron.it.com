import type { SessionLog, Seat, SystemLogEntry } from './types';

export const INITIAL_SESSIONS: SessionLog[] = [
  {
    id: 'T-740921-A',
    date: '21 SEP 74',
    theater: 'GLOBE THEATRE',
    play: 'HAMLET',
    seat: 'G-14',
    notes: 'VISUAL CONFIRMED. AUDIO SYNC ERROR RECTIFIED.',
    status: 'SUCCESS',
  },
  {
    id: 'T-740921-B',
    date: '21 SEP 74',
    theater: 'GLOBE THEATRE',
    play: 'HAMLET',
    seat: 'G-15',
    notes: 'VISUAL CONFIRMED. NO ANOMALIES DETECTED.',
    status: 'SYNCED',
  },
  {
    id: 'T-740922-A',
    date: '22 SEP 74',
    theater: 'GLOBE THEATRE',
    play: 'HAMLET',
    seat: 'G-03',
    notes: 'VISUAL CONFIRMED. SEATING CONFLICT G-03/G-04.',
    status: 'ALERT',
  },
  {
    id: 'T-740923-B',
    date: '23 SEP 74',
    theater: 'GLOBE THEATRE',
    play: 'TUGURIPEL',
    seat: 'G-06',
    notes: 'EXPERIMENTAL LOG ENTRY. ACOUSTIC DAMPENING OPTIMAL.',
    status: 'SUCCESS',
  },
  {
    id: 'T-740924-A',
    date: '24 SEP 74',
    theater: 'GLOBE THEATRE',
    play: 'MARCELINE',
    seat: 'G-11',
    notes: 'VISUAL CONFIRMED. AUDIO SYNC RE-INITIATED AT ACT II.',
    status: 'SYNCED',
  },
  {
    id: 'T-740925-C',
    date: '25 SEP 74',
    theater: 'GLOBE THEATRE',
    play: 'THE FRAMESHORT',
    seat: 'G-08',
    notes: 'CRITICAL ERROR. SYSTEM REBOOT DURING INTERMISSION.',
    status: 'FAILURE',
  },
  {
    id: 'T-740926-A',
    date: '26 SEP 74',
    theater: 'GLOBE THEATRE',
    play: 'THE TEMPEST',
    seat: 'G-01',
    notes: 'SIGNAL GAIN OFFSET CALIBRATED ON STAGE AMBIENTS.',
    status: 'SUCCESS',
  },
  {
    id: 'T-740926-B',
    date: '26 SEP 74',
    theater: 'GLOBE THEATRE',
    play: 'THE TEMPEST',
    seat: 'G-24',
    notes: 'ACOUSTIC FEEDBACK LOOP ON RIGHT REAR SECTOR RESOLVED.',
    status: 'SYNCED',
  },
  {
    id: 'T-740927-A',
    date: '27 SEP 74',
    theater: 'GLOBE THEATRE',
    play: 'MACBETH',
    seat: 'G-17',
    notes: 'AUDIENCE INTERFERENCE REPORTED ON SECTOR G ELEVATIONS.',
    status: 'ALERT',
  },
  {
    id: 'T-740928-C',
    date: '28 SEP 74',
    theater: 'ROYAL PLAYHOUSE',
    play: 'THE ALCHEMIST',
    seat: 'G-30',
    notes: 'BOOSTER DE-COUPLING DETECTED DURING SECOND ACT.',
    status: 'FAILURE',
  },
  {
    id: 'T-740929-A',
    date: '29 SEP 74',
    theater: 'ROYAL PLAYHOUSE',
    play: 'THE ALCHEMIST',
    seat: 'G-19',
    notes: 'VISUAL RESOLUTION LEVEL EXCEEDS ORIGINAL SPECS.',
    status: 'SUCCESS',
  },
  {
    id: 'T-740929-B',
    date: '29 SEP 74',
    theater: 'ROYAL PLAYHOUSE',
    play: 'THE ALCHEMIST',
    seat: 'G-10',
    notes: 'THERMAL READOUT STABILIZED AT 24.2 CELSIUS.',
    status: 'SYNCED',
  },
];

export const INITIAL_SYSTEM_LOGS: SystemLogEntry[] = [
  { timestamp: '14:02:22', text: 'OVERRIDE DETECTED SECTOR H', type: 'ALERT' },
  { timestamp: '14:02:15', text: 'USER_ADMIN LOGGED IN', type: 'INFO' },
  { timestamp: '14:02:11', text: 'PING SUCCESS', type: 'SUCCESS' },
];

// Initialize 20 seats for Sector G (G-01 to G-20) with standard occupancy
export const generateInitialSeats = (): Seat[] => {
  // Pre-determined indices of occupied seats to match visual pattern of ~1/2 capacity out of 20
  const occupiedIndices = [1, 2, 4, 6, 8, 10, 11, 13, 14, 15, 17, 19, 20];
  const seats: Seat[] = [];

  for (let i = 1; i <= 20; i++) {
    const id = `G-${i.toString().padStart(2, '0')}`;
    const isOccupied = occupiedIndices.includes(i);
    seats.push({
      id,
      status: isOccupied ? 'OCCUPIED' : 'VACANT',
      sessionId: isOccupied
        ? `T-74092${Math.floor(Math.random() * 5 + 1)}-A`
        : undefined,
    });
  }
  return seats;
};

export const ENCYCLOPEDIA_NOTES = [
  {
    topic: 'TACTICAL OBSERVATION MANUAL',
    notes:
      'This registry holds historical details of late 1970s performance assessments at physical Globe Theaters. Operators scan the seating capacity, sound, and visual sync matrices. It remains a strict offline manual records system.',
  },
  {
    topic: 'THEATER MAPPING PROCEDURES',
    notes:
      'Operators must monitor Sector G (Seats 01-40) during every performance. Unscheduled signal spikes or seat overrides require entering manual session IDs via the Command Override Panel.',
  },
  {
    topic: 'ENCRYPTION COMPLIANCE',
    notes:
      'Rules dictate that Legacy-A encryption is maintained across sectors. Re-initiate state buffers after any failure diagnostic alerts.',
  },
];
