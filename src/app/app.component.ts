import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { locale } from '@utils/locale';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'patients-frontend';
  items: MenuItem[] | undefined;
  date = new Date();

  constructor(private config: PrimeNGConfig) {
  }

  ngOnInit() {
    // this.config.ripple = true;
    this.config.setTranslation(locale.es);
    this.items = [];
  }
}
