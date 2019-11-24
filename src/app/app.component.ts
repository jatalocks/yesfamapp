import { Component } from '@angular/core';
import { faMap, faList } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YesFamApp';
  faMap = faMap;
  faList = faList;
  ngOnInit(){

  }
}
