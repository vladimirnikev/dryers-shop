import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private authService: AuthService) {

  }
  async ngOnInit(): Promise<void> {
    await this.authService.login({ email: 'vn@gmail.com', password: '12345678' }) // admin
    // await this.authService.login({email: 'vn11@gmail.com', password: '12345678'}) // user
  }
}
