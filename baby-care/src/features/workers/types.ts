export interface Worker {
  id: number;
  workerId: string;
  name: string;
  birthdate: string; // כי DateOnly נשלח כמחרוזת
  phone: string;
  email?: string;
  workerType: string;
  startDate: string;
  experience?: number;
}
