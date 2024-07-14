// Assuming Student interface or class
export interface Student {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  classe: { [groupId: string]: boolean }; // Change the type to an object
  photo?: string;
}
