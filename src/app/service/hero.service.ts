import { Injectable } from '@angular/core';

import { Http, Response, Headers }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Hero} from '../model/hero';
import {HEROES} from './mock-heroes';



@Injectable()
export class HeroService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private heroesUrl = "api/heroes";//'src/app/service/app/heroes.json';  // URL to web API
    constructor (private http: Http) {}
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }
    getHero(id: number): Promise<Hero> {
    	const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }
    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
 //    getHeroesSlowly(): Promise<Hero[]> {
	// 	  return new Promise(resolve => {
	// 	    // Simulate server latency with 2 second delay
	// 	    setTimeout(() => resolve(HEROES), 2000);
	// 	  });
	// }
    private extractData(res: Response) {
      debugger;
      let body = res.json();
      return body.data as Hero[]
      //return body.data as Hero[] || { };
    }
    private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
