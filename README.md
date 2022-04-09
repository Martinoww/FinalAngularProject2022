# FinalAngularProject2022
This is my Angular SPA for SoftUni Front-end final exam.

Description of what my application contains.

This is a single-page application that is created with angular, it is about games and information about them. 

There are two views one is for the guest users and the other is for users.

1. In the first one(guest users view) you can read detailed information about games and search for games.
2. In the second one(user view) you can create a game, the create page is a form with validation logic inside, when you populate the form correctly you can add your game(send HTTP POST request to the back-end server, after response if there are no errors you will be navigated to games section), the logged in users also can read information about games and search games, but they also can like and dislike games only if they are not the owners of the game. The owners of the games can edit and delete their game, the edit view is also a form view, the form is dynamically populated with the data that the current game is created with, after correctly populating the form an HTTP PUT request is sent, and you will be navigated to the game details page.
3. The application has interceptors, guards, authentication, validation, animation(loading spinner which is implemented with angular material), and routing.
4. For the back-end I used back4app (BaaS). 
    
