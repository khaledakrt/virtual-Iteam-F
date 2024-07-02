// src/app/demo/api/group.ts
export interface Group {
  _id?: string; // _id is optional because it will be missing for new groups
  id?: string;
  level: string;
  specialty: string;
  number: string;
  
  // Add any other properties as needed
}
