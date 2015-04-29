CaliWeb README

FrontEnd
========

Andular.js

Backend
=======

Node/Express/Mongo

TODO
===

Backend
----
* Finish models
* User Auth -- Collaborate with Angularjs
* Scrape Geotag data from pictures
* New Caption API
* New Vacation API
* New Picture API
* Fix duplicate user creation --
ReferenceError: handleError is not defined
    at Promise.<anonymous> (/Users/CCEW/Desktop/Jared/CaliWeb/app.js:84:12)

****************************************************************************************************************

Refresh always goes to index from any page. Refreshing also LOGS YOU OUT. After research, I found this:

1) The issue being discussed here comes from refreshing the page in HTML5 mode -- in order for that to work properly, you have to serve your webapp not just on Index.html, but also any paths you use in the app -- so that the webapp will get served on URLs like http://localhost/dashboard or http://localhost/login. That is one solution -- make sure you serve your webapp on any URL the browser might get. This isn't an angular/ui-router issue, this is a backend issue.

*****************************************************************************************************************

*Logout on logout click
*Front PAge - Public Vacations
*Hide Caption Edit if not your vacation
*Incorrect password error message

*Android App

Android
-------
* Boilerplate
* Access photo library
* Photo Upload
* Background Service
* Create a Vacation
* Authentication

Web Frontend
------------

