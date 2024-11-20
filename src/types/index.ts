export interface HandoverDocument {
  id: string;
  date: Date;
  accountNumber: string;
  name: string;
  documentIndex1: string;
  documentIndex2: string;
  documentIndex3: string;
  documentIndex4: string;
  information: string;
  recipient: string;
  photoProof: string;
  createdAt: Date;
}