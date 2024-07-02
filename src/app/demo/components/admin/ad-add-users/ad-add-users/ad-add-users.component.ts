// ad-add-users.component.ts

import { Component, OnInit } from '@angular/core';
import { AdAddUsersService } from 'src/app/demo/service/instances.service';

@Component({
  selector: 'app-ad-add-users',
  templateUrl: './ad-add-users.component.html',
  styleUrls: ['./ad-add-users.component.scss']
})
export class AdAddUsersComponent implements OnInit {
  instances: any[] = [];

  constructor(private adAddUsersService: AdAddUsersService) { }

  ngOnInit(): void {
    this.adAddUsersService.getInstances().subscribe(
      data => {
        this.instances = data;
      },
      error => {
        console.error('Error fetching instances:', error);
      }
    );
  }
}
