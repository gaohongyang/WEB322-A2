# WEB322-Movie Website
This is a movie website which is built with Node.js, Express, API, Express-Handlebars, Express-Session, Express-Fileupload, Mongoose, and Bcryptjs.

This Website allows regular users and administrators to login, and different types of login will grant different accessibility, for example, administrator is allowed to add/remove movies/TV shows from the website, users are allowed to add movies/TV shows to their shopping cart and checkout, and guests are only allowed to view the website, they will not get accessibility to these functions.

## 1.Home Page
Navigation Bar:
This navigation bar contains the name of the movie website, which is my last name, and when clicking on the name, user will go to the main page. I also added a ‘Home’ section to give the user one more way to go to the home page. The section named “All Movies And Shows” will lead the user to go to a web page which displays all movies and TV shows that available on the website. The “Sign In” section will take user to the sign in page. The search bar will allow users to do a search for the movie/TV show with its name.

Hero Section:
This section will automatically display the most demanded movies or TV shows and users can also scroll by clicking the arrows on the banner. The pictures is not clickable for now, it only shows the information of the movies.

Featured Movies and TV shows:
These two sections are basically same, they are both showing the movies or shows in a slider format. Users can slide these pictures by left clicking and drag. All these pictures are dynamically pulled from the fake database which is an array of object, and they are also clickable, when users click on the picture, they will go to the description page of that movie or show.

Content Section:
In this section, a list of ‘deals’ will be displayed in the grid form. When users move the mouse over the image, ‘View Details’ will show up automatically, and will lead users to the specific page by clicking on it. But this section is not implemeted for now, it will be done in the future.

Footer:
The footer contains the links for all social medias, and a footer menu is shown below the icons, users can also find some useful options here, they are all clickable and will be implemented in the future.

## 2.Products Page
When users click on “All Movies And Shows”, they will go to this page, all movies and TV shows are displayed in this page, with their name showing below the poster. This page pulls all the movies and shows form the fake database, and all of them are clickable, when users move their mouse over the image, the “View Details” will show up and users will go to its description page after clicking on the image. In this website, only 12 movies and shows are displayed, there will be more and more movies by the development of the website.

## 3.Movies & TV Details Page:
This page lists the title of the movie and its descriptions, there are also two images shown, one is the small poster and another one is a big poster which is shown as a background image. Two buttons are also implemented, one is for sell and one is for rent, only logged in users can buy/rent movies by clicking these buttons, and the movie/TV show will be added to their rent cart or purchase cart.

## 4.Login Page:
In this page, the email address and password will be required in order to log into the website. There is also a “Remember me” option for users to save users’ time when they log in again in the future. If a user does not have any account, he or she can click on the “Register” link to register a new account.

This login page will validate the user’s input only for nulls. If user does not input anything, the form will validate and return error messages to remind user. This page will not validate the patterns of user’s input in order not to restrict any user’s login action.

## 5.Register Page:
New users can create their account in this page, and their information such as email, name, gender etc. will be filled. Users can click on “RESET” button to clear the form and fill again, and they can also click on submit to submit the information and create a new account. After users created new account, they can click on the “Sign In” link to go to the log in page.

In the registration page, most of the fields need to be filled except phone number, if a user doesn't fill the required field, the website will show a proper error message to remind the new user. If the user is using an email address that is registered already, the website will also show an error message to remind user try another email address. Considering some people does not want to share phone number with any institution, so I made it optional. Everything else will be required to fill and satisfy the proper format.

When a user registered a new account, the website will send a welcome message to the email address that the user provided. In this case, SendGrid API is used.

## 6.Dashboard:
There are two different types of dashboards, one is for regular users, another one is for administrator.

For the administrator dashboard, it will allow us to add a new movie/TV show to the website by filling up a form and uploading the posters. it will also allow us to see the list of movies/TV shows that we have on the website, and delete them by clicking on the "DELETE" button, or edit them by clicking on the "EDIT" button, in the edit page, administrator will be allowed to change the movies information and posters.

For the regular user dashboard, it will allow users to check their rent cart and purchase cart by clicking on the different buttons, for the purchase cart, users are allowed to check the mive's name and price, users are also allowed to delete them from shopping cart by clicking on the "DELETE" button, for the rent cart, users are alllowed to check the movie's name, price, time and location, users are also allowed to delete them by clicking on the "DELETE" button. Users are also allowed to go to checkout page to pay for their rents and purchases all together, and the total payment number will be calculated automatically and be shown to users. When user click on the "CONFIRM ORDER" button, their shopping cart will be cleared auotmatically and a confirmation email will be sent to the users' email address with the detailed information of the purchase.
