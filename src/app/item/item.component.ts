import { Component, effect, input, output } from '@angular/core';
import { NgOptimizedImage, CommonModule  } from '@angular/common';
import { ItemDetail } from '../interface/item';

@Component({
  selector: 'app-item',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  readonly item = input.required<ItemDetail>();
  loaded = output<number>();

  constructor() {
    effect(() => {
      this.loaded.emit(this.item().id);
    });
  }
}
