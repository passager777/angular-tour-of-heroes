import { Injectable, ElementRef } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Hero }           from '../model/hero';
@Injectable()
export class HeroSearchService {
  private element: ElementRef;
  constructor(private http: Http, el: ElementRef) {
    this.element = el;
  }
  search(term: string): Observable<Hero[]> {
    this.element.nativeElement.style.display = "block";
    return this.http
               .get(`app/heroes/?name=${term}`)
               .map(response => response.json().data as Hero[]);
  }
  onBlur():void {
  	debugger;
  	this.element.nativeElement.style.display = "none";
  }
}