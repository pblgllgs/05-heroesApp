import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'
    }
  ];

  public heroe :Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  };

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){
      this.activatedRoute.params
          .pipe(
            switchMap(({id}) =>this.heroesService.getHeroeById(id))
          )
          .subscribe(heroe => this.heroe = heroe)
    }else{
      return;
    }
  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0){
      return;
    }
    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => console.log('Actualizando', heroe));
    }else{
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe =>{
        this.router.navigate(['/heroes/editar',heroe.id]);
      });
    }
    
  }

  eliminar(){
    this.heroesService.eliminarHeroe(this.heroe.id!)
    .subscribe(heroe =>{
      this.router.navigate(['/heroes']);
    });
  }

}
