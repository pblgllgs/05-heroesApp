import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
              private router:Router,
              private snackBar :MatSnackBar,
              private dialog:MatDialog) { }

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
      .subscribe(heroe => this.mostrarSnackBar("Registro Actualizado"));
    }else{
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe =>{
        this.router.navigate(['/heroes/editar',heroe.id]);
        this.mostrarSnackBar("Registro Creado");
      });
    }
    
  }

  eliminar(){

    const dialog = this.dialog.open(ConfirmarComponent ,{ 
      width:'250px',
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe(result => {
        if(result){
          this.heroesService.eliminarHeroe(this.heroe.id!)
            .subscribe(heroe =>{
              this.router.navigate(['/heroes']);
          });
        }
      })
    
  }

  mostrarSnackBar(mensaje :string):void{
    this.snackBar.open(mensaje,'Cerrar',{
      duration: 2500
    });
  }


}
