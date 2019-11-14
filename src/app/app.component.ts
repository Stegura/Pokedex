import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { PokemonService } from  './services/pokemon.service';

import { PokemonList } from './modules/pokemon-list.module';
import { Pokemon } from './modules/pokemon.module';
import { type } from 'os';
import { element } from 'protractor';

interface PokemonInfo {
  name: string;
  id: Number;
  types: Array<any>;
  attack: any;
  defense: any;
  hp: any;
  spAttack: any;
  spDefense: any;
  speed: any;
  weight: any;
  moves: Number;
  img_url: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  visible = true;

  selectable = true;

  removable = true;

  addOnBlur = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  typeCtrl = new FormControl();
  filteredTypes: Observable<string[]>;
  types: string[] = [];
  allTypes: string[] = [
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
    "unknown",
  ];

  title = 'Pokedex';

  next: String;

  pokemons: Array<Pokemon> = [];

  nextList: String;

  pokemonInfo: PokemonInfo;

  @ViewChild('typeInput', {static: false}) typeInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  
  constructor( private pokemonService: PokemonService) {
    
    this.filteredTypes = this.typeCtrl.valueChanges.pipe(
      startWith(null),
      map((type: string | null) => type ? this._filter(type) : this.allTypes.slice()));

  }

  
  ngOnInit() {
    this.fetchPokemonList();
  }

  fetchPokemonList() {
    this.pokemonService
    .getPokemonList()
    .subscribe((data: PokemonList) => {
      this.next = data.next;
      data.results.forEach(element => {
        this.pokemonService
        .getPokemonData(element.url)
        .subscribe( (res: Pokemon) => {
          this.pokemons.push(res)
        })
      });
    })    
  }

  loadMore() {
    // this.pokemons = [];
    this.pokemonService
    .loadMore(this.next)
    .subscribe((data: PokemonList) => {
      this.next = data.next;
      data.results.forEach(element => {
        this.pokemonService
        .getPokemonData(element.url)
        .subscribe( (res: Pokemon) => {
          this.pokemons.push(res)
        })
      });
    })
  }

  getInfo(url) {
    this.pokemonService
    .getPokemonDataById(url)
    .subscribe( (res: Pokemon) => {
      this.pokemonInfo = {

        name: res.name,
        id: res.id,
        types: res.types,
        attack: null,
        defense: null,
        hp: null,
        spAttack: null,
        spDefense: null,
        speed: null,
        weight: res.weight,
        moves: res.moves.length,
        img_url: res.sprites.front_default,
      }

      this.getStats(res.stats);
    })
  }

  getStats(stats) {
    stats.forEach(element => {
      if(element.stat.name === 'attack') {
        this.pokemonInfo.attack = element.base_stat;
      }

      if(element.stat.name === 'defense') {
        this.pokemonInfo.defense = element.base_stat;
      }

      if(element.stat.name === 'hp') {
        this.pokemonInfo.hp = element.base_stat;
      }

      if(element.stat.name === 'special-attack') {
        this.pokemonInfo.spAttack = element.base_stat;
      }

      if(element.stat.name === 'special-defense') {
        this.pokemonInfo.spDefense = element.base_stat;
      }

      if(element.stat.name === 'speed') {
        this.pokemonInfo.speed = element.base_stat;
      }
    });
  }

  add(event: MatChipInputEvent): void {
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.allTypes.splice(this.allTypes.indexOf(value.trim()), 1)
        this.types.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.typeCtrl.setValue(null);

      
      this.filter(this.types);
    }
  }

  remove(type: string): void {
    this.allTypes.push(type)

    const index = this.types.indexOf(type);

    if (index >= 0) {
      this.types.splice(index, 1);
      this.filter(this.types);
    }

    
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.types.push(event.option.viewValue);
    this.allTypes.splice(this.allTypes.indexOf(event.option.viewValue.trim()), 1)
    this.typeInput.nativeElement.value = '';
    this.typeCtrl.setValue(null);
  }

  filter(arr: Array<String>) {
    if(arr.length) {
      document.querySelectorAll('.pokemon-card').forEach(element => element.classList.add('hiden'))

      arr.forEach(element => {
        document.querySelectorAll(`.${element}`).forEach(element => {
          element.parentElement.parentElement.classList.remove('hiden')
        })
      })
    } else {
      document.querySelectorAll('.pokemon-card').forEach(element => element.classList.remove('hiden'))
    }

    this.pokemonInfo = null;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTypes.filter(type => type.toLowerCase().indexOf(filterValue) === 0);
  }
}