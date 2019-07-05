import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {}
  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getUserInfo().subscribe(res => {
      this.user = res
    })
  }

  ngOnInit() {
  }
  save(){
    this.userService.update(this.user).subscribe(res => {
      this.user = res
      alert('Información Actualizada')
      this.router.navigateByUrl('/home')
    })
  }
}
