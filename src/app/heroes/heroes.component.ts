import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
// import { HEROES } from "../mock-heroes";
import { HeroService } from "../hero.service";
@Component({
  selector: "app-heroes", //用于匹配html元素的名称，以识别该组件
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
// export class HeroesComponent implements OnInit {
//   hero: Hero = {
//     id: 1,
//     name: "hello boys"
//   };
//   heroes: Hero[];
//   selectedHero: Hero;
//   constructor(private heroService: HeroService) {}
//   getHeroes(): void {
//     this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
//     console.log(this.heroes, "");
//   }
//   onSelect(hero: Hero): void {
//     this.selectedHero = hero;
//   }
//   ngOnInit() {
//     //这是一个生命周期钩子，在创建完成后
//     this.getHeroes();
//   }
// }
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
