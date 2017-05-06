import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes} from '@angular/core';
import {Hero} from "../model/hero";
import { RouterModule, Routes, Router } from '@angular/router';
import {HeroService} from '../service/hero.service';
/**

*/
@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  //template:`<>`
  styleUrls: ['./heroes.component.css'],
  // animations: [
  //   trigger('fadeIn', [
  //     state('in', style({ display: 'none' })), // 默认元素不展开
  //     transition('void => *', [ // 进场动画
  //       animate(200, keyframes([
  //         style({ height: '0', opacity: 0, offset: 0 }), // 元素高度0，元素隐藏(透明度为0)，动画帧在0%
  //         style({ height: '*', opacity: 1, offset: 1 }) // 200ms后高度自适应展开，元素展开(透明度为1)，动画帧在100%
  //       ]))
  //     ]),
  //     transition('* => void', [
  //       animate(200, keyframes([
  //         style({ height: '*', opacity: 1, offset: 0 }), // 与之对应，让元素从显示到隐藏一个过渡
  //         style({ height: '0', opacity: 0, offset: 1 })
  //       ]))
  //     ]),
  //   ])],
  // animations: [//进场离场动画实现
  //   trigger('flyInOut', [
  //     state('in', style({transform: 'translateX(0)'})),
  //     transition('void => *', [//进场动画
  //       style({transform: 'translateX(-100%)'}),
  //       animate(1000)
  //     ]),
  //     transition('* => void', [
  //       animate(100, style({transform: 'translateX(100%)'}))
  //     ])
  //   ])
  // ]
  animations: [
  /*
    heroState动画实现(官网中'状态与转场'实现方式)：
      手写修改了一下Hero model类，增加了hero的状态state，
      在初始化in-memory-data.service.ts中给heroes中hero添加state状态
      然后根据官网教程加入下面的animations动画属性，在页面html中引入有状态的
      两种方式一种是不传递状态(@+animateName)，一种是传递状态的([@animateName]="hero.state")
      此外在点击英雄时候，click事件触发函数加入修改此hero的state状态以通过状态改变来显示动画
  */
    trigger('heroState',[
        state('inactive',style({
          backgroundColor:"yellow",
          transform: "scale(1)"
        })),
        state('active', style({
          backgroundColor:"#cfd8dc",
          transform: "scale(1.1)"
        })),
        transition('inactive => active', animate(100)),
        transition('active => inactive', animate(100))
      ])
  ]
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
    hero.state ="active";
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  get diagnostic() { return JSON.stringify(this.heroes); }

}
