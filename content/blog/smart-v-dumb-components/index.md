---
title: Concept of Smart & Dumb Components in Angular.
date: "2020-01-04T22:12:03.284Z"
---
<!-- 
![Concept of Smart & Dumb Components in Angular](./images.jpeg) -->

## According to Stephen Fluin, Core Member of Angular Team & GDE,
> <strong>The way you design your components informs the entire architecture of your angular application.</strong>


In this article, we'll see what are smart components & dumb components in Angular, differences between them, why you might want to use this pattern in your application & the implementation (code) of smart & dumb components. 

> Note: Smart & Dumb components have nothing to do with Angular, it's an approach we can use in any framework/library like react, vue, etc 

If you want to check the code right now, here's' the repository for it: https://github.com/Mohammad-Quanit/Angular-Demos/tree/ng-smart-dumb-components

## Dumb Components

Dumb components really just said a component that does not have a lot of states that are long-lived. it doesn't have access to services. it doesn't store data in a back-end all those sorts of things that really keep the focus of the component on presentation. We can call them <strong>isolated components</strong> as well.

```javascript
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent implements OnInit {
  @Input() list: any[];
  constructor() { }

  ngOnInit() {
  }

}

```


In my code example, I have created three components `view-todos`, `todos-list` & `single-todo`.


The above code is from the `todos-list.component.ts` file, which is simply just receiving data by `@Input()` decorator. As it is nothing to do with services or any other states, it's just receiving the data and bind into its HTML template. That simply is <strong>Dumb Components</strong>.


## Smart Components

Smart Components are simply those components, which contains states, implementing services or any kind of business logic happening in that component. It does not focus on presentation but what's happening in our component. Then, we simply emit the property to <b>Dumb Components</b> which are received by `@Input()` decorator.

```javascript
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrls: ['./view-todos.component.css']
})
export class ViewTodosComponent implements OnInit {
  list: Observable<any[]>;

  constructor(http: HttpClient) {
    const path = 'https://jsonplaceholder.typicode.com/posts';
    this.list = http.get<any[]>(path).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  ngOnInit() {}
}

```

```html
<app-todos-list [list]="list | async"></app-todos-list>
```

`app-todos-list` component is the <b>Dumb Component</b>, which we traditionally called in out `view-todos-list` component.

Now You may have noticed that include `changeDetection: ChangeDetectionStrategy.OnPush` in `app-todos-list` which is a <b>Dumb Component</b>, is because when data changes it automatically detects and updates the dom. it's very trivial to just say change detection has a change detection strategy of push which is going to eliminate these things from the change detection tree whenever that input hasn't changed which means that I'm going to have a more performant better application for my users.

Here's you can learn more about [Change Detection](https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/).

Now you might be wondering, what are the benefits of this approach.
* Smart Components are easily shared across our application, If configured properly.

* I can trust that these things are all going to work in isolation.

* Consistent Experience.

* They're gonna help you architect and scale your application.

So that's pretty much it, for Smart & Dumb components.
You can check the code for the example here:
https://github.com/Mohammad-Quanit/Angular-Demos/tree/ng-smart-dumb-components.

If you like it, please do follow me on [twitter/mquanit](https://twitter.com/mquanit).

🎉🎉 Happy 2020. 🎉🎉
