import { Component, OnInit, AfterViewInit, inject, signal, computed, ViewChild, HostListener } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ItemComponent } from '../item/item.component';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-timeline',
  imports: [RouterLink, ItemComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit, AfterViewInit {
  apiService = inject(ApiService);
  viewportScroller = inject(ViewportScroller);
  items = computed(() => this.apiService.items());
  count = computed(() => this.apiService.count());
  scrollY = computed(() => this.apiService.scrollY());
  lastIndex = computed(() => this.apiService.lastIndex());
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.apiService.scrollY.update(() => window.scrollY);
  }

  ngOnInit() {
    if (this.items().length == 0) {
      this.apiService.scrollY.update(() => 0);
      this.getItems()
    }
  }

  ngAfterViewInit(): void {
    this.viewportScroller.scrollToPosition([0, this.apiService.scrollY()]);
    // window.scrollTo(0, this.apiService.scrollY());
  }

  getItems(next?: string) {
    this.apiService.getItems();
  }

  loaded(id: number) {
    if ( this.lastIndex() < this.count() && this.items().at(-5)?.id === id) {
      this.getItems();
    }
  }

}
