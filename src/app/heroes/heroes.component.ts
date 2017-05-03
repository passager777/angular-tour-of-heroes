import { Component, OnInit } from '@angular/core';
import {Hero} from "../model/hero";
import { RouterModule, Routes, Router } from '@angular/router';
import {HeroService} from '../service/hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  //template:`<>`
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  title = 'heroes works!';
  heroes : Hero[];
  selectedHero: Hero;
  constructor(
    private router: Router,
    private heroService: HeroService){
    //在构造函数中初始化heroes，不推荐
    // this.heroes = this.heroService.getHeroes();
  }
  ngOnInit(){
    //初始化heroes
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  get diagnostic() { return JSON.stringify(this.heroes); }

}
