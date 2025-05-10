import { Component,OnChanges,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/state/app.state';
import { CitiesActions } from '../../state/cities.actions';
import { selectCities } from '../../state/cities.selectors';
import { DataService } from '../../../core/services/data.service';
import { Subject, takeUntil } from 'rxjs';

export enum TableActions {
  View,
  Delete
}

@Component({
  selector: 'app-cities',
  standalone:false,
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }
  cities!: String[];
  citiesStore$ = this.store.select(selectCities());
  private destroy$ = new Subject<void>();

  currentPage = 1;
  itemsPerPage = 5; 
  paginatedCities:String[] = []; 
  totalPages = 1;
  pages:number[] = [];

  ngOnInit(): void {
    this.store.dispatch({type: CitiesActions.GET_CITIES});
    this.assignDetails();
    

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  assignDetails() {
    this.citiesStore$.pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.cities = data;
      this.updatePagination();
    });
  }

  selectCity(city:String) {

    this.router.navigate(['cities',  city]);
    
    }

    updatePagination() {
      this.totalPages = Math.ceil(this.cities.length / this.itemsPerPage);
      this.paginatedCities = this.cities.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
        console.log(this.paginatedCities)
      this.pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    }
  
    changePage(page: number) {
      if (page < 1 || page > this.totalPages) {
        return; 
      }
      this.currentPage = page;
      this.updatePagination();
    }
  
    changeItemsPerPage(limit: number) {
      this.itemsPerPage = limit;
      this.currentPage = 1;
      this.updatePagination();
    }
  }

