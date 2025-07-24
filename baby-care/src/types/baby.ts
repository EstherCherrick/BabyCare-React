export interface Baby {
  id: number;
  babyId: string;
  name: string;
  birthdate: Date;
  gender: boolean;
  weight: number;
  height: number;
  birthWeight: number;
  motherName?: string;
  fatherName?: string;
  parentPhone: string;
  parentEmail?: string;
  address: string;
}
