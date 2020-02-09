import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recipe-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  
  searchText: string = '';

  constructor() { }

  ngOnInit() {
  }

}
