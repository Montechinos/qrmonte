export interface ScanRecord {
    id: string;
    userId: string;
    type: string;
    data: string;
    scannedAt: Date;
    label?: string;
  }
  
  export interface AppUser {
    uid: string;
    email: string | null;
    displayName: string | null;
  }
 