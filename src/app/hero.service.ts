//设置和确定服务的数据模拟
import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
/*
这个新的服务导入了 Angular 的 Injectable 符号，并且给这个服务类添加了 @Injectable() 装饰器。它把这个类标记为依赖注入系统的参与者之一。HeroService 类将会提供一个可注入的服务，并且它还可以拥有自己的待注入的依赖。 目前它还没有依赖，但是很快就会有了。
@Injectable() 装饰器会接受该服务的元数据对象，就像 @Component() 对组件类的作用一样。
*/
/**
 * http相关的内容导入
 * */
import { HttpClient, HttpHeaders } from "@angular/common/http"; //提供【http
// 错误处理
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  //接收元数据对象
  providedIn: "root"
})
export class HeroService {
  // constructor(private heroService: HeroService) {}、

  constructor(
    private http: HttpClient, //注入的http私有属性
    private messageService: MessageService
  ) {} //private 建立私有变量参数
  // 需要多次调用  该方法   this.messageService.add(`HeroService:${message}`);
  private log(message: string) {
    this.messageService.add(`HeroService:${message}`);
  }
  // 定义访问地址
  private heroesUrl = "api/heroes"; //url to web api
  // getHeroes(): Observable<Hero[]> {
  //   //'<>'泛型检测容易出错
  //   this.messageService.add("heroService: fetched heroes ");
  //   return of(HEROES);
  // }
  // 使用http的效果获取数据
  /**
   * 定义错误函数定义为私有的
   *  */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<Hero[]>("getHeroes", [])));
  }
  getHero(id: number): Observable<Hero> {
    // //构造出对应的
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
    // 根据api获取baseurl/:id 更具id获取对应的数据
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`他的api 返回 的id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id} 发生错误的id`))
    );
  }
  //获取和修改详情添加 HeroService.updateHero()
  /**
   * httpClient.put() 接收三个参数
   * URL地址
   * 要修改的数据
   * 选项
   *  */

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>("updateHero"))
    );
  }
  /**
   * post一个新数据
   * 向服务器添加一个新服务
   * @param hero
   */

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>("addHero"))
    );
  }
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>("deleteHero"))
    );
  }
  // 添加的搜索功能
  /**
   * 设计搜索
   * 如果没有搜索词，该方法立即返回一个空数组。 剩下的部分和 getHeroes() 很像。 唯一的不同点是 URL，它包含了一个由搜索词组成的查询字符串。
   *  */

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>("searchHeroes", []))
    );
  }
}
