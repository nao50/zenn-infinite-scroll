import { Injectable, inject, signal, computed, resource, ResourceRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Item, ItemDetail } from '../interface/item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #http = inject(HttpClient);
  items = signal<ItemDetail[]>([]);
  item = signal<ItemDetail>({
    id: 0, name: '', imageUrl: '',types: [], sprites: {other: {'official-artwork': {'front_default': ''}}}
  });
  count = signal(0);
  scrollY = signal(0);
  lastIndex = signal(0);
  next = signal('');
  // id = signal(1);
  // item2: ResourceRef<ItemDetail> = resource({
  //   request: () => ({id: this.id()}),
  //   loader: async ({ request, abortSignal }): Promise<ItemDetail> => {
  //     const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${request.id}`, {
  //       signal: abortSignal,
  //     });
  //     return resp.json();
  //   },
  // });

  constructor() { }

  getItems(next?: string) {
    const limit = 15;
    const offset = 0;

    const url = this.next() ? this.next() : `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`

    this.#http.get<Item>(url)
    .pipe(
      mergeMap(item => {
        const requests = item.results.map(result => this.#http.get<ItemDetail>(result.url).pipe(
          map(detail => ({ ...detail, imageUrl: detail.sprites.other['official-artwork'].front_default }))
        ));
        return forkJoin(requests).pipe(
          map(details => ({ ...item, details }))
        );
      })
    ).subscribe((res) => {
      this.count.update(() => res.count);
      this.lastIndex.update(lastIndex => lastIndex + res.details.length);
      this.next.update(() => res.next ? res.next : '');
      this.items.update(i => {
        return [...i, ...res.details];
      });
    });
  }

  getItem(id: number) {
    this.#http.get<ItemDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map(detail => ({ ...detail, imageUrl: detail.sprites.other['official-artwork'].front_default }))
    ).subscribe((res) => {
      this.item.update(() => {
        return res
      });
    });
  }
}
