// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {Hero} from '../model/hero';
import { HeroService } from '../service/hero.service';
//然后导入switchMap运算符，之后会与路由参数Observable一起使用。
import 'rxjs/add/operator/switchMap';

@Component({
  //moduleId: module.id,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    constructor(
    	private heroService:HeroService,
    	private route: ActivatedRoute,
  		private location: Location
    	){}
    ngOnInit(): void {
    	this.route.params
    	.switchMap((params: Params) => this.heroService.getHero(+params['id']))
    	.subscribe(hero => this.hero = hero);
    }
    goBack(): void {
      this.location.back();
    }
}
