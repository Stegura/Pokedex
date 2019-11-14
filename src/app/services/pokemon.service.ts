import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonList() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/?limit=12');
  }
  
  getPokemonData(url) {
    return this.http.get(url);
  }

  getPokemonDataById(id) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
  
  loadMore(url) {
    return this.http.get(url);
  }
}
