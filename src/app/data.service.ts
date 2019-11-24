import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://yesfamapp-fcca.restdb.io/rest/people";

  constructor(private httpClient: HttpClient) { }

  getPeople() 
  {
    return this.httpClient.get(this.REST_API_SERVER, {headers: new HttpHeaders().set("x-apikey", "5dd0190264e7774913b6ed55")});    
  }

  addPerson(name,country,city,intro,lat,lng)
  {
    this.httpClient.post(this.REST_API_SERVER,
      {
        "Name": name,
        "Country":country,
        "City":city,"Intro":intro,
        "lat":lat,
        "lng":lng
      },{
        headers: new HttpHeaders().set("x-apikey", "5dd0190264e7774913b6ed55")
      }).subscribe(
          (val) => {
              console.log("POST call successful value returned in body", 
                          val);
          },
          response => {
              console.log("POST call in error", response);
          },
          () => {
              console.log("The POST observable is now completed.");
          });
  }

  getCountries() {
    return this.httpClient.get('./assets/countries.json', {headers: new HttpHeaders().set("Content-Type", "application/json")});
}

getCities() {
  return this.httpClient.get('./assets/cities.json', {headers: new HttpHeaders().set("Content-Type", "application/json")});
}

  }

/*
var jsondata = {"field1": "xyz","field2": "abc"};
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://yesfamapp-fcca.restdb.io/rest/people",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "x-apikey": "<your CORS apikey here>",
    "cache-control": "no-cache"
  },
  "processData": false,
  "data": JSON.stringify(jsondata)
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
*/
