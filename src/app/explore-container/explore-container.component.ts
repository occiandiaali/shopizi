import { CartService, Product } from './../services/cart.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  result: Product[] | undefined;

  @Input() name?: string;

  constructor(private cSvc: CartService) {}

  ngOnInit() {}
}
