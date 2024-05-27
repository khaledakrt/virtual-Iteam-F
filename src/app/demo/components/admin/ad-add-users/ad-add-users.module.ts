// ad-add-users.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdAddUsersRoutingModule } from './ad-add-users-routing.module';
import { AdAddUsersComponent } from './ad-add-users/ad-add-users.component';
import { UserService } from 'src/app/demo/service/user.service';

@NgModule({
  declarations: [AdAddUsersComponent],
  imports: [CommonModule, FormsModule, AdAddUsersRoutingModule],
  providers: [UserService]
})
export class AdAddUsersModule {}
