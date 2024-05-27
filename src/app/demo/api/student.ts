// src/app/demo/api/student.ts
export interface Student {
    _id?: string; // _id is optional because it will be missing for new student
    id?: string;
    nom: string;
    prenom: string;
    email: string;
    password?: string;
    role?: string;
    classe?: string;
    vms?: string;
    photo?: string;

    // Add any other properties as needed
  }
  