// teacher-profil.component.ts

import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { Teacher } from 'src/app/demo/api/teacher';
import { Group } from 'src/app/demo/api/group';

@Component({
  selector: 'app-teacher-profil',
  templateUrl: './teacher-profil.component.html',
  styleUrls: ['./teacher-profil.component.scss']
})
export class TeacherProfilComponent implements OnInit {
  teacherData: Teacher | null = null; // Property to contain teacher data
  idTeacher: string | null;
  groups: Group[] = []; // Initialize groups array

  constructor(private teacherService: TeacherService) {
    this.idTeacher = localStorage.getItem('id_teacher');
  }

  ngOnInit(): void {
    if (this.idTeacher) {
      this.teacherService.getTeacherById(this.idTeacher).subscribe(data => {
        console.log(data);
        // Replace backslashes with forward slashes in photo URL
        if (data.photo) {
          data.photo = data.photo.replace(/\\/g, '/');
        }
        this.teacherData = data; // Assign fetched data to teacherData
        this.loadGroups(); // Load groups after fetching teacher data
      })
    } else {
      console.error('No teacher ID found in localStorage');
    }
  }

  loadGroups() {
    this.teacherService.getGroups().subscribe((data) => {
      this.groups = data; // Assign fetched groups data to the groups array
    });
  }

  // Method to get the URL of the teacher's photo
  getTeacherPhotoUrl(photoFileName: string): string {
    return this.teacherService.getTeacherPhotoUrl(photoFileName);
  }

  // Method to format and return detailed class information
  formatClasses(classIds: string[]): string {
    if (!classIds || classIds.length === 0 || this.groups.length === 0) {
      return ''; // Return an empty string if no class IDs or groups available
    }

    const classNames = classIds.map(groupId => {
      const group = this.groups.find(g => g._id === groupId);
      if (group) {
        return `${group.level} ${group.specialty} ${group.number}`; // Correct interpolation
      } else {
        return 'Unknown Group'; // Handle case where group is not found (optional)
      }
    });

    return classNames.join(', ');
  }
}
