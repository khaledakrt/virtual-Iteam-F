// src/app/demo/api/teacher.ts
export interface Teacher {
    _id?: string; // _id is optional because it will be missing for new teachers
    id?: string;
    nom: string;
    prenom: string;
    email: string;
    password?: string;
    role?: string;
    specialite?: string;
    classes?: string;
    vms?: string;

    // Add any other properties as needed
  }
  