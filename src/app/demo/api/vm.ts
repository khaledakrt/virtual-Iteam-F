// src/app/demo/api/teacher.ts
export interface Vm {
    _id?: string; // _id is optional because it will be missing for new teachers
    id?: string;
    name: string;
    private_ips: string;
    floating_ips: string;
    

    // Add any other properties as needed
  }
  