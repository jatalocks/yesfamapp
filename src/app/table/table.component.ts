import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  people: Person[];

  selectedPerson: Person;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getPeople().subscribe((data: Person[])=>{
      
      this.people = data;
      
    });

    this.sortOptions = [
      {label: 'Newest First', value: '!country'},
      {label: 'Oldest First', value: 'country'},
      {label: 'Country', value: 'country'}
  ];
  }

  handleQuotes(thing){
    return thing.replace(/^"(.+)"$/,'$1').toLowerCase();
  }

  selectPerson(event: Event, person: Person) {
    this.selectedPerson = person;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  onDialogHide() {
      this.selectedPerson = null;
  }
}
interface Person{
  Name: string;
  Country: string;
  City: string;
  Intro: string;
  Social: string;
}
/*
    cars: Car[];

    selectedCar: Car;

    displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsLarge().then(cars => this.cars = cars);

        this.sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'},
            {label: 'Brand', value: 'brand'}
        ];
    }

    selectCar(event: Event, car: Car) {
        this.selectedCar = car;
        this.displayDialog = true;
        event.preventDefault();
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onDialogHide() {
        this.selectedCar = null;
    }
    */
