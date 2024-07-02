// teacher.ts
export interface Teacher {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
  specialite: string;
  vms: string;
  classes: { [groupId: string]: boolean }; // Change the type to an object
  photo?: string;
}
