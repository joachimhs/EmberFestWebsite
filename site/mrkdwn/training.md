Ember Fest Training Day One
===========================

In this two day Ember.js Training program you be starting from scratch and building up a complete Ember.js application step by step. As we move along with the development, each of the concepts introduced will be explained thoroughly. During the first day, we will go through the following concepts: 

 - The structure of an Ember.js application
 - A thorough contrast between the server-side MVC model approach and the Ember.js client-side MVC model approach
 - Introduction to Bindings, Computed Properties, Handlebars templates and Views
 - The Ember Router
 - Interaction with the server side using bare-bones Ember.js
 - Authentication through Mozilla Persona

<span style="font-weight: 500;">If you have other topics that you want to learn more about, please tell me in advance and I will include this during the training course.</span> 

The structure of an Ember.js application
----------------------------------------

We will start the day with an explanation of how an Ember.js application is structured, as well as what puts the structure of an Ember.js application apart from other web-based MVC applications. We will discuss where Ember.js fits into the development stack, and where Ember.js might not be a suitable framework for your next web application project. 

After an introduction, you will get time to work on your own, in pairs or in groups to set up a skeleton of an Ember.js application. You will be using and extending upon this skeleton throughout the training course, ending up with a complete application by the end of day two. 

Server-side MVC vs. Ember.js Client-side MVC
---------------------------------------------

<a href="/img/training_mvc.png"><img src="/img/training_mvc.png" style="float: left; width: 325px; height: 250px; margin-right:20px;"></a>Ember.js includes a very rich Model-View-Controller (MVC) model that enrich all of the parts of a standard MVC model. When you build up an Ember.js application you will be separating the concerns of your applications, and you will spend a decent amount of time sitting down, thinking of where you would best place your application logic.

If you have spent most of your time developing web applications with server-side generated markup and JavaScript Ember.js, an indeed most of the new JavaScript frameworks, will have a completely different structure than what you might be used to. 

Introduction to Bindings, Computed Properties, Handlebars templates and Views
-----------------------------------------------------------------------------

#### Models

At the bottom of the stack Ember.js uses Ember Data in order to simplify and provide the rest of the application with the rich data model features that you will need in order to build truly rich web based applications. The model layer holds the data for the application. The data objects are generally specified clearly through a semi-strict schema. There is usually very little functionality within the models, and as we will see throughout this book the model object is generally responsible for tasks such as data formatting. The view will bind the GUI components against properties on the model objects, via a controller

#### Controllers and Ember Router

<a href="/img/training_router.png"><img src="/img/training_router.png" style="float: right; width: 250px; height; 300px; margin-left:20px;"></a>Above the model layer is the controller layer. The controller acts mainly as a link between the models and the views. Ember.js ships with a couple of custom controllers, most notably the Ember.ObjectController and the Ember.ArrayController. Generally, you would use the ObjectController if your controller is representing a single object, (like a selected blog post), and the ArrayController if your controller represents an array of items (like a list of all blog posts). 

We will go through how Ember Router enriches the Controller-layer of your application, while it helps you to think about your application as a set of routes that your users are able to travel across your application. 

#### Views and Handlebars.js

The view layer is responsible for drawing its elements onto the screen. The views generally hold no permanent state of their own, with very few exceptions. By default, each view in Ember.js will have exactly one controller as its context. It will use this controller to fetch its data, and it will by default use this controller as the target for any user actions that occurs on the view.

We will go through how you can utilize powerful Handlebars.js templates, combined with views that will help you create distinct views that you can reuse throughout your application. 

Interaction with the server-side using bare-bones Ember.js
---------------------------------------------------------

While Ember Data is positioning itself to become a full-fledged ORM for the web, it is still not ready for production use. This session will start out by explaining some of the core concepts that Ember Data brings to the table, before showing one approach you can use in order to implement the most basic parts of a mini Ember Data implementation. 

We will start out by creating an abstract Model class that the rest of the models within the application can leverage in order to create the CRUD (Create, Read, Update and Delete) operations that your application will be dependant on.

After this session you will understand how you can utilize concepts like an identity map in order to create a robust server-side communication model for your own applications. You will also learn how to implement some of the core features that Ember Data is built upon, while implementing an API that is similar to the current Ember Data API. This will enable you to quickly migrate to using Ember Data for your applications when that makes sense and Ember Data is ready for production use. 

Authentication through Mozilla Persona
--------------------------------------

Mozilla Persona offers a complete third-party authentication platform that you can utilize within your Ember.js application. In this session you will learn how Mozilla Persona works, and we will go through a couple of different approaches that you can follow in order to implement a third party authorization protocol into your own Ember.js application. 
