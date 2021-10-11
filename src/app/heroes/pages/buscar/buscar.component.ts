import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public termino:string ="";

  public heroes: Heroe[] = [];

  public heroeSelecionado: Heroe | undefined; 


  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim())
    .subscribe(heroes => this.heroes = heroes);
  }

  opcionSelecionada(event: MatAutocompleteSelectedEvent ){
    if(event.option.value == null){
      this.heroeSelecionado = undefined;
      return ;
    }else{
      const heroe:Heroe = event.option.value;
      this.termino= heroe.superhero;

      this.heroesService.getHeroeById(heroe.id!)
      .subscribe(heroe => this.heroeSelecionado = heroe)
    }
    
  }



}
