import { Component, OnInit } from '@angular/core';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  faThumbsUp = faThumbsUp;
  /*
  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      draggable: false
    },
  ]
  */
  markers: marker[] = [];
  tempMarker: marker = {
    lat: null,
    lng: null,
    name: null,
    city: null,
    country: null,
    draggable: null,
    intro: null,
    iconUrl: null,
    social: null
  };
  firstClick: boolean = true;
  name: any;
  social: any;
  city: any;
  country:  Object = {name: ""};
  intro: any;
  triggered: boolean = false;
  added: boolean;
  filteredCountriesSingle: any[];
  filteredCitiesSingle: any[];
  countries: Object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.reloadPeople();
    this.dataService.getCountries().subscribe(countries => {
      this.countries = countries;

    });
  }
  filterCountrySingle(event) {
    let query = event.query;
    this.dataService.getCountries().subscribe(countries => {
      
      this.filteredCountriesSingle = this.filterCountry(query, countries);
    });
  }

  filterCountry(query, countries): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

  filterCitySingle(event) {
    let query = event.query;
    this.dataService.getCities().subscribe(cities => {
      this.filteredCitiesSingle = this.filterCity(query, cities);
    });
  }

  filterCity(query, cities): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < cities.length; i++) {
      let city = cities[i];
      if (city.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(city);
      }
    }
    return filtered;
  }



  reloadPeople() {
    this.dataService.getPeople().subscribe((data: any[]) => {
      
      this.markers = [];
      data.forEach(person => {
        this.markers.push({
          lat: person['lat'], lng: person['lng'], draggable: false, name: person["Name"], city: person["City"], country: person["Country"], intro: person["Intro"],social: person["Social"], iconUrl: 'https://icon-library.net/images/android-marker-icon/android-marker-icon-4.jpg'

        })
        //this.markers[this.markers.length-1].icon("https://icon-library.net/images/android-marker-icon/android-marker-icon-4.jpg");
      });
    })
  }

  // google maps zoom level
  zoom: number = 4;


  clickedMarker(label: string, index: number) {
    //
  }

  mapClicked($event: AGMMouseEvent) {
    
    if (this.triggered == false) {
      if (this.firstClick == true) {
        this.tempMarker.lat = $event.coords.lat;
        this.tempMarker.lng = $event.coords.lng;
        this.tempMarker.draggable = true;
        this.tempMarker.name = this.name;
        this.tempMarker.city = this.city;
        this.tempMarker.country = this.country["name"];
        this.tempMarker.intro = this.intro;
        this.tempMarker.social = this.social;
        this.firstClick = false;
        this.markers.push(this.tempMarker);
      }
      else {
        this.tempMarker.lat = $event.coords.lat;
        this.tempMarker.lng = $event.coords.lng;
        this.markers[this.markers.length - 1].lat = $event.coords.lat;
        this.markers[this.markers.length - 1].lng = $event.coords.lng;
        this.tempMarker.draggable = true;
        this.tempMarker.name = this.name;
        this.tempMarker.city = this.city;
        this.tempMarker.country = this.country["name"];
        this.tempMarker.intro = this.intro;
        this.tempMarker.social = this.social;
      }
    }
    else {
      Swal.fire({ title: 'Already added yourself', iconUrl: 'info' });
    }
  }

  addMarker() {
    
    if ((this.name != undefined) && (this.country["name"] != undefined) && (this.intro != undefined) && (this.city != undefined) && (this.social != undefined)) {
      this.dataService.addPerson(this.name, this.country["name"], this.city, this.intro, this.tempMarker.lat, this.tempMarker.lng,this.social)
      this.triggered = true;
      Swal.fire({ title: 'Success', iconUrl: 'success' });
    }
    else {
      Swal.fire({ title: 'Please fill all fields', iconUrl: 'warning' });
    }
  }


  markerDragEnd(m: marker, $event: MouseEvent) {
    //
  }


}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  //label?: string;
  draggable: boolean;
  name: string;
  city: string;
  country: string;
  intro: string;
  iconUrl: string;
  social: string;
}
