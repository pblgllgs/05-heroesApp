import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private httpClient:HttpClient ) { }

  getHeroes(): Observable<Heroe[]>{
    return this.httpClient.get<Heroe[]>('http://localhost:3000/heroes');
  }

}
