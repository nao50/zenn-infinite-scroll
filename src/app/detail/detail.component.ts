import { Component, OnInit, inject, computed } from '@angular/core';
import { NgOptimizedImage, CommonModule   } from '@angular/common';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  imports: [NgOptimizedImage, CommonModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  items = computed(() => this.apiService.items());
  // item = computed(() => this.apiService.item());
  itemResource = this.apiService.itemResource;


  ngOnInit() {
    // if(this.items().length == 0){
    // }
    this.apiService.id.update(() => +this.route.snapshot.paramMap.get('id')!);
    // this.apiService.id.update(() => +this.route.snapshot.paramMap.get('id')!);
    // this.apiService.getItem(+this.route.snapshot.paramMap.get('id')!)
  }
}
