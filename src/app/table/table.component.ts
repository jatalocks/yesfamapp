import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  people: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getPeople().subscribe((data: any[])=>{
      console.log(data);
      this.people = data;
    })  
  }
}
