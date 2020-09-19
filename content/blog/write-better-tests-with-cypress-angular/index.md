---
title: Write Better Automated Tests With Cypress in Angular.
date: "2020-09-19T22:12:03.284Z"
---

![Write Better Automated Tests With Cypress in Angular](./cypress-ng.jpeg)

Hello devs and testers, in this article, I'll show you how we can write automated end-to-end tests on an angular project which is Todo App on [cypress](https://www.cypress.io/). We will have some scenarios for doing our <b>e2e</b> tests and we will be covering it one by one. This article will not probably be covering angular parts but cypress parts.

So if you just want to write some tests right now, do clone this repo which I have already created with the angular Todo App project and cypress configured in it. Here's the repo link [https://gitlab.com/mquanit/angular-items](https://gitlab.com/mquanit/angular-items). Just clone this, if you want everything ready for playing with cypress.

So, before moving to our examples, first, we have to know what is [<b>Cypress</b>](https://www.cypress.io/). According to its [official Website](https://www.cypress.io/) 

> Cypress is an automated end-to-end testing framework for writing automated tests

But why should we use cypress when we have many other testing tools like **Protactor**, **Karma**, **Mocha**, etc.

Cypress is much like Protractor for Angular applications, but Cypress is much faster to run and easier to debug. Cypress not only is good at the automated end-to-end testing that is independent of our applications, but also is capable of unit testing against methods in model classes, service classes, and so on. Cypress provides a complete end-to-end testing experience in your browser where you can see your tests in an automated way. 

Cypress provides it's own test runner where you can do the tests locally. Cypress provides some other cool features like **Time Travel**, **Debuggability**, **Real-time reloads**, **Automatic waiting**. These brilliant features make apart this tool and we will see these in action.

So talk enough, if you've already cloned this repo then you're good to go but if not then you probably have an angular project and you just have to add Cypress as a dependency. We only need to install an `npm package cypress` using the following command,
```
npm i -D cypress
```
The cypress package includes a desktop app and the Cypress binary. It may take a few minutes to run this command for the first time because the package installation needs to download the Cypress binary. The Cypress binary is saved in a global cache directory, so installing this package in the future will be much faster for the same version.

After Installing Cypress, a folder named **`cypress`** and a file named **`cypress.json`** has been added into your project's root folder. The generated cypress [folder](https://docs.cypress.io/guides/references/configuration.html#Folders-Files) is the place where we write tests and the place where Cypress generates artifacts. The generated [configuration file](https://docs.cypress.io/guides/references/configuration.html#Options) cypress.json contains an empty JSON object. This file is the place where we configure the default behavior of Cypress. So I will be doing some configuration before writing our tests.

In your `cypress.json` file, add the below code for the default config,

```javascript
{
  "baseUrl": "http://localhost:4200",
  "ignoreTestFiles": "**/examples/*",
  "viewportHeight": 760,
  "viewportWidth": 1080
}
```
As their name suggests, you will write your tests on `baseUrl` which is `localhost:4200` for angular projects.
When you add Cypress into your project, it provides an `examples` folder in which some demo test files are included, but we don't need default example tests in our project so we exclude this from our Test Suite.

So, that's all in our setup. Let's write some code for our first test.
 
In your folder structure under the `cypress` folder, you'll see an `integration` folder, that is where you'll write all your tests so that you'll see on your test suite.

Create your first test file, `DemoTest.spec.js` and add the below code in that file.

```javascript
describe("Our Todo App Test Suite", () => {
  it("Visiting our app", () => {
    cy.visit("/");
    cy.get(".nav-wrapper").contains("Items Manager");
  });
});

```
In the above code, we used the `describe` function which is responsible for all our cases. It's often called a `Suite` or `Test Suite`. Under the `describe` function, we used the `it` function where we write our test code. In the above case, we are visiting our angular app by using `cy.visit("/")` and we are verifying that it'll contain a `nav-wrapper` class which contains text **`Items Manager`**.



There are many API's provided by cypress from getting an element to make assertions and many more. Here `cy.get()` is used to get the element's reference from DOM. This is the most used API from cypress.

Now open second cmd terminal and type,
```
npx cypress open       //to open cypress test runner
```
It will take some time at first, but you'll see something like this.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/5kxfxjkx51nigcrifv5l.png)

This is called Test Runner. Click on your file name `DemoTest.spec.js` and there is another instance of the browser that will open for your test. Now you'll see how easy and fast is it to work on cypress tests.

Let's write another test for `typing` into input fields and then add new todo by clicking the `Submit` button. 

```javascript
describe("Our Todo App Test Suite", () => {
  it.only("Type title and description", () => {
    cy.visit("/");
    cy.get("input[name='title']").type("Lunch")
    cy.get("input[name='description']").type("Eating lunch at 1")
    cy.get('input[type="submit"]').click()
    cy.get("ul.collection").find("li > strong").should("contain", "Lunch")
  });
  });
});

```
When you run this case, it will type into both input fields and click on the Submit button which in this case will add a new Todo Item in our Todo list and in last we are [asserting](https://docs.cypress.io/guides/references/assertions.html) that our added todo contains text `Lunch`

Now let's see an example of deleting a todo item and verify that it is deleted.

```javascript
describe("Our Todo App Test Suite", () => {
  it.only("Type title and description", () => {
    cy.visit("/");
    cy.get("ul.collection > li").eq(1).find("a").click()
    cy.get("ul.collection > li").eq(1).find("form").find('button[class="btn red"]').click()
    cy.get("ul.collection > li").eq(1).should("not.exist")
  });
  });
});

```
So that's how you do e2e testing by cypress. Now try to update some value by cypress by yourself. If you are able to do it successfully then congrats, you can call yourself an `Automation Test Engineer` because that's what automation test engineers do on their roles.

So I hope you guys like this article and learn something new and don't forget to follow me for more of these kinda articles.

Happy Testing ✌️✌️