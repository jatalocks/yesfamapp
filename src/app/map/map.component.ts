import { Component, OnInit } from '@angular/core';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

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
  tempMarker: marker;
  name: string;
  city: string;
  country: string;
  intro: any;

  constructor(private dataService: DataService) {}

  ngOnInit() 
  {
    this.reloadPeople()
  }

  reloadPeople(){
    this.dataService.getPeople().subscribe((data: any[])=>{
      console.log(data);
      this.markers = [];
      data.forEach(person => {
          this.markers.push({lat :person['lat'], lng :person['lng'], draggable: false,name: person["Name"], city: person["City"], country: person["Country"],intro: person["Intro"]})
      });
    })  
  }

 // google maps zoom level
 zoom: number = 4;
  

 clickedMarker(label: string, index: number) {
   //console.log(`clicked the marker: ${label || index}`)
 }
 
 mapClicked($event: AGMMouseEvent) 
 {
   if (this.name && this.country && this.intro && this.city)
   {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true,
        name: this.name,
        city: this.city,
        country: this.country,
        intro: this.intro
      });
      this.dataService.addPerson(this.name,this.country,this.city,this.intro,$event.coords.lat,$event.coords.lng)
      Swal.fire('Added', 'Success', 'success');
   }
   else
   {
      Swal.fire('Alert', 'Please fill all fields', 'warning');
   }

 }
 
 markerDragEnd(m: marker, $event: MouseEvent) {
   //console.log('dragEnd', m, $event);
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
}
