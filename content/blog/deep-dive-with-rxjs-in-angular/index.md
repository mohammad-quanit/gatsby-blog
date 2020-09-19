---
title: Deep Dive with RxJS in Angular.
date: "2020-03-22T22:12:03.284Z"
---

![Deep Dive with RxJS in Angular](./rxjs.jpeg)

Before we deep dive in [RxJS](https://rxjs.dev/) or [Reactive Extension For Javascript](https://rxjs.dev/) in Angular, we should know what exactly is RxJS. RxJs is a Powerful Javascript library for reactive programming using the concept of [Observables](https://rxjs.dev/guide/observable). It is one of the hottest libraries in web development, Offering a powerful, functional approach for dealing with events and with integration points into a growing number of frameworks, libraries, and utilities, the case for learning Rx has never been more appealing.

### According to its Documentation
> Think of RxJS as Lodash for events. 

ReactiveX or RxJS works internally with [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) in which an Object, we call as <b>Subject</b> maintains it's dependencies and notifies when any of its state changes.

# Why RxJS
As RxJS, follows functional programming fundamentals, it provides every type of [Pure Function](https://www.freecodecamp.org/news/what-is-a-pure-function-in-javascript-acb887375dfe/) for events. This simply means your code is less prone to errors. Normally we create impure functions that could possibly mess up your code when it grows.

# Streams

RxJS works as [Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) for your app on any event. Streams are basically the definition of [Observables](https://rxjs.dev/guide/observable) which we cover right after it. Stream API allows you to get a sequence of data in the form of chunks, where we usually get large data from API in little pieces of data. RxJS Stream itself contains many sub-API's which makes it easier for everyday tasks related to web APIs like mouse events, Keyboard events or any kind of data that is coming right from the backend services.

Now let's move onto some basic concepts which RxJS is based on for async event management.

# Observables
As we have discussed above, Observables are a definition or declaration of Streams and by its means is that it is a collection of future events or values, which we get continuously from time to time. You can create an observable from nearly anything, but the most common use case in RxJS is from events. The easiest ways to create <b>Observables</b> is by using built-in functions provided by <b>RxJS</b>. Angular ships this cool library by default so you don't need to install it explicitly.

Let's see a code snippet:

<b>Note:</b> Try code snippets online in <b>[ng-run.com](https://ng-run.com/)</b> so you don't have to create angular project just for these snippets. 

```javascript
import { Component, VERSION, OnInit } from '@angular/core';
import { interval, fromEvent } from "rxjs";      // <----------- importing rxjs lib 

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const interval$ = interval(2000);  //<-- interval func. same as setinterval in vanilla javascript
    interval$.subscribe(val => console.log(val)) // subscribed to listen our stream of numbers
  }
}
```
After running this code, open chrome debugging tools by pressing the `F-12` key and check the console tab. You will see numbers after 2 seconds of delay.

You have noticed that I have created a constant variable `interval$`, and you may be wondering why I added `$` with the variable name. It's just an standard for <b>Observables</b> means that this variable is an <b>Observable</b>.

Let's see another simple code example:

```javascript
import { Component, VERSION, OnInit } from '@angular/core';
import { interval, fromEvent } from "rxjs";      // <----------- importing rxjs lib 

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const clickEvt$ = fromEvent(document, 'click');
    clickEvt$.subscribe(evt => console.log(evt))
  }
}
```
After executing this code, when you click anywhere on the browser document, you'll see `mouse click event` on console as it creates an Stream of click events to listen on every click.

# Subscription
Subscription is what sets everything in motion. We could say that it's the execution of Observable, where you get to subscribe to events and map or transform data as you want. To create a subscription, you call the subscribe method, supplying a function (or object) - also known as an observer. A Subscription has one important method known as `unsubscribe()` which takes no argument and is responsible for disposing / exiting of subscription. In previous versions of RxJS, Subscription was called "Disposable".

```javascript
import { Component, OnInit } from '@angular/core';
import { fromEvent } from "rxjs";
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  ngOnInit() {
    const clickEvt$ = fromEvent(document, 'click');
    clickEvt$.subscribe(evt => console.log(evt))
  }
}
```

In the above code snippet, we set up a click event listener on anywhere on the document, then we passed the <b>subscribe</b> method on each click of the document and then it returns an object with <b>Unsbscribe</b> which contains clean up logic, like removing events.

It's important to note that each subscription will create it's own execution context which means calling `subscribe` method a second time will create a new event listener

```javascript
import { Component, OnInit } from '@angular/core';
import { fromEvent } from "rxjs";
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  ngOnInit() {
    const clickEvt$ = fromEvent(document, 'click');
    const keyUpEvt$ = fromEvent(document, 'keyup');
    clickEvt$.subscribe(evt => console.log(evt));
    keyUpEvt$.subscribe(evt => console.log(evt));
  }
}
```

Subscriptions create one on one, one-sided conversation between the <b>Observable</b> & <b>Observer</b>, which also known as <b>Unicasting</b>. It's worth noting that when we discuss an Observable source emitting data to observers, this is a push-based model. The source doesn't know or care what subscribers do with the data, it simply pushes it down the line.


# Operators
RxJS is incomplete without its <b>operators</b>, even though <b>Observables</b> are the foundation. Operators are some pure functions in RxJS, which is responsible for manipulating data from source returning an Observable of the transformed values. Many of the RxJS operators are similar to vanilla javascript functions like `map` for Arrays. Here's what it looks like in Rxjs code:

```javascript
import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  ngOnInit() {
   const transformedData = of(1,2,3,4,5,6)
      .pipe(map((val: any) => val * 5))
      .subscribe(data => console.log(data));
  }
}
```

You'll see all these numbers are multiplied with `5` in subscription, and if you console `transformedData`, it will show that specific Observable.
There are many sheer numbers of Operators which could be overwhelming at first as you starting to learn RxJS. We Obviously don't cover all these operators but will provide details of mostly used ones which you could probably use in your applications.

<i>Let's start with the most common one,</i>

## Pipe
The <b>Pipe</b> function is the assembly line from your observable data source through your operators. It's for using multiple operators within an observable chain, contained within the pipe function. We can implement multiple operators in the `pipe` function for better readability.

```javascript
import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  ngOnInit() {
   const transformedData = of(1,2,3,4,5,6)
      .pipe(map((val: any) => val * 5))
      .subscribe(data => console.log(data));
  }
}
```

## Of
Another most common & simplest RxJS operator is `Of` function. It simply emits each value in a sequence from a source of data and then emits a complete notification. 

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/h7716xir3zryebtsxyd2.png)
<i>official marble image from rxjs official site</i>

Code Snippet for `Of` operator

```javascript
import { Component, OnInit } from '@angular/core';
import { of } from "rxjs";
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  ngOnInit() {
    const person = { name: 'John Doe', age: 22 };  //<-- simple object
    const personObs = of(person);                  //<-- convert object into stream
    personObs.subscribe(data => console.log(data)) //<-- execute observable
  }
}
```

There are 6 types of operators that RxJS based upon.

1) Creation Operators
2) Combination Operators
3) Error Handling Operators
4) Filtering Operators
5) MultiCasting Operators
6) Transforming Operators

# Creation Operators
Creation operators are functions that can be used to create Observable from any other data type or convert it into an Observable, like in the above example we did. From generic to specific use-cases you are free, and encouraged, to turn [everything into a stream](http://slides.com/robwormald/everything-is-a-stream#/). There are many [other operators](https://www.learnrxjs.io/learn-rxjs/operators/creation) included in Creation Operators. 

Here's an example of Simple Creation Operators with RxJS Ajax module:

```javascript
import { Component, VERSION, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.full;
  githubUsers = `https://api.github.com/users`;
  users = ajax({ url: this.githubUsers, method: "GET" })
  ngOnInit() {
    const subscribe = this.users.subscribe(
      res => console.log(res.response),
      err => console.error(err)
    );
  }
}

``` 

# Combination Operators
Combination Operators also known as <b>Join Operators</b> allows the join of data from multiple observables. Emitted values are the primary variation among these operators. There are many [other operators](https://www.learnrxjs.io/learn-rxjs/operators/combination) included in Combination Operators. 

Here's the example of the most common combination operator,

```javascript
import { Component, VERSION, OnInit } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { map, combineAll, take } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.full;
  ngOnInit() {
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(
      map(
        ev => interval(Math.random() * 2000).pipe(take(3))
      ), take(2)
    );
    const result = higherOrder.pipe(combineAll())

    result.subscribe(data => console.log(data));
  }
}

```

In this example, we have combined the result of `clicks` and `higherOrder` observables and show it into the console by subscribing `result` observable.


# Error Handling Operators
Errors are an unfortunate side-effect of development. These operators provide effective ways to gracefully handle errors and retry logic, should they occur. Some of the [other operators are](https://www.learnrxjs.io/learn-rxjs/operators/error_handling) included in Error Handling Operators. 

Here's the example of the `catchError` handling operator, which catches errors on the observable to be handled by returning a new observable or throwing an error.

```javascript
import { Component, VERSION, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.full;
  ngOnInit() {
    of(1, 2, 3, 4, 5).pipe(
      map(num => {
        if (num == 4) throw 'Four!'
        return num
      }),
      catchError(err => of('I', 'II', 'III', 'IV', 'V')),
    )
      .subscribe(data => console.log(data))
  }
}
```

#Filtering Operators
The filtering operators provide techniques for accepting - or declining - values from an observable source and dealing with the build-up of values within a stream. This operator is similar to `Array.prototype.filter`, which yields true for emitted values.

Here's the simplest `filter` operator example from RxJS,

```javascript
import { Component, VERSION, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.full;
  ngOnInit() {
    const source = from([
      { name: 'Joe', age: 31 },
      { name: 'Bob', age: 25 }
    ]);

    //filter out people with age under 30
    const example = source.pipe(filter(person => person.age >= 30));
    //output: "Over 30: Joe"
    const subscribe = example.subscribe(val => console.log(`Over 30: ${val.name}`))
  }
}
```

#Multicasting Operators
In RxJS observables are cold, or unicast (one source per subscriber) by default. These operators can make an observable hot, or multicast, allowing side-effects to be shared among multiple subscribers.

Example of `multicast` operator with standard Subject,

```javascript
import { Component, VERSION, OnInit } from '@angular/core';
import { Subject, interval, ConnectableObservable } from 'rxjs';
import { take, tap, multicast, mapTo } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.full;
  ngOnInit() {
    //emit every 2 seconds, take 5
    const source = interval(2000).pipe(take(5));

    const example = source.pipe(
      //since we are multicasting below, side effects will be     executed once
      tap(() => console.log('Side Effect #1')),
      mapTo('Result!')
    );

    //subscribe subject to source upon connect()
    const multi = example.pipe(multicast(() => new Subject())) as ConnectableObservable<number>;
    /*
      subscribers will share source
      output:
      "Side Effect #1"
      "Result!"
      "Result!"
      ...
    */
    const subscriberOne = multi.subscribe(val => console.log(val));
    const subscriberTwo = multi.subscribe(val => console.log(val));
    //subscribe subject to source
    multi.connect()
  }
}
```
Here in the above example we use `connectObservable<number>` as type for our `pipe` function because `pipe` function only returns an `Observable` but `mutlicast` operator returns `connectObservable`, so that's how we get `connect` funtion with `multi` named observable. Here you can leran more about [Connectable Observable](https://rxjs.dev/api/index/class/ConnectableObservable)

#Transformation Operators
Transforming values as they pass through the operator chain is a common task. These operators provide transformation techniques for nearly any use-case you will encounter. In some of our examples above we used some of the transformation operators like `mapTo`, `map`, `scan` & `mergeMap`. Here are all the [operators in transformation operators](https://www.learnrxjs.io/learn-rxjs/operators/transformation).

Let's see an example of the most common transformation operator,

```javascript
import { Component, VERSION, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.full;
  ngOnInit() {
    // free api url
    const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

    // streams
    const click$ = fromEvent(document, 'click');
    click$
      .pipe(
        /*
         * Using mergeMap for example, but generally for GET requests
         * you will prefer switchMap.
         * Also, if you do not need the parameter like
         * below you could use mergeMapTo instead.
         * ex. mergeMapTo(ajax.getJSON(API_URL))
         */
        mergeMap(() => ajax.getJSON(API_URL))
      )
      // { userId: 1, id: 1, ...}
      .subscribe(console.log);
  }
}
```
Here's on above example, we are merging our `click$` observable with response which we are getting from `ajax.getJSON()`. When we click on anywhere on document, we will get a response from API in console.

Here are all the main operators, described in this article, and I hope you learned something new regarding RxJS. Here are some more resources of RxJS,
[https://www.learnrxjs.io/](https://www.learnrxjs.io/)
[https://rxjs.dev/](https://rxjs.dev/api)
[https://www.learnrxjs.io/learn-rxjs/recipes](https://www.learnrxjs.io/learn-rxjs/recipes)
[https://www.youtube.com/playlist?list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi](https://www.youtube.com/playlist?list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi)

If you like it please share it in your circle and follow me for more of this kinda brief article.

Peace ✌️✌️✌️