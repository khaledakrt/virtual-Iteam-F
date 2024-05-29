// teacher.ts
export interface Teacher {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
  specialite: string;
  classes: string;
  vms: string;
  photo?: string; // Ajout de la propriété photo
}
