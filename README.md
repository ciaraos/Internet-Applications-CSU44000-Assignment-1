# Internet Applications CSU44000 Assignment 1
 
The objective of this first assignment is to develop a simple Internet Application which demonstrates the following:
•	A reactive client running in an Internet Browser using Vue.js – demonstrating some simple knowledge of the V- directives and moustache syntax and interacting with a Server-Side application using at least one Web API primitive
•	A Server-side application which exposes at least one API primitive and consumes the services of a 3rd party Web API – you won’t be able to do this from the client side due to ‘same-origin’ restrictions

You are asked to produce an application that inputs the city that someone is planning to go to.  Your server-side should use the openweathermap API to get the weather forecast for that city for the next 5 days.  You should then display for the user some summary information including:
•	Packing: if there is rain anytime over the next 5-days indicate that the user should bring an umbrella
•	Indicate whether the user should pack for Cold (temp range -10..+10), Warm (+10-+20) or Hot (20+)
•	Give a summary table for the next 5 days showing: Temperature, Wind Speed and Rainfall level

#Set Up 
•	npm install --save express
•	npm install node-fetch 
