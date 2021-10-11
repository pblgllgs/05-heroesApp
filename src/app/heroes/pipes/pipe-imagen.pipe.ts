import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class PipeImagenPipe implements PipeTransform {

  transform(heroe:Heroe):string | undefined{
    return `assets/heroes/${heroe.id}.jpg`;
    
  }

}
