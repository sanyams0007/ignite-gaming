<h1 align="center">Ignite Gaming</h1>
<h5 align="center">An end to end massive Full-Stack (MERN) e-commerce web application.
</h5>
<br/>

<br/>

## 🎯 About

### Overview of project

I have started this project with the purpose of learning how to create and structure a full-stack Web App of a mid-level complexity by integrating multiple technologies such as React, Redux, Redux-Thunk, React Hooks, React Router Dom, MaterialUI and more technologies.<br/>
I've tried to follow best practices as much as possible and I've tried to make it scalable and maintainable. I've also added a voice assistant (name Alan AI) from this [website](https://alan.app/) for interacting with the app(althought not a full blown Voice Assistant) but still made it to do some task such as searching product, adding item to cart, removing item from cart, view cart etc.<br/>
I put a lot of effort into it and I hope that you could like it.<br/><br/>
The Web App redirects you to a Homepage which list products, each product tile represents a game: you can click on it's name and you will be redirected to the selected game/product detail component, a page that gives all details about the choosen product including images, review, recommended items and more.
But in order to get most out of the app you need to sign up or to sign in: you can sign in with your custom account or with Demo account. Once you are logged in, you will be able to successfully make purchase of product, you will be provided all debit/credit details on payment page.<br/>

Also added Admin dashboard through which admin can manage inventory, orders, reviews, users and more.<br/><br/>
Go try it and please let me know if you enjoyed it with a ⭐️, I would appreciate it a lot.
<br/>

## ▶️ Demo

Here you can find the demo links:

- [Heroku](https://ignite-gaming.herokuapp.com/)

## Test credentials (for lazy users 😓)

### Admin Login

> Email: jessica@gmail.com<br/>
> Password: jessica<br/>

### User Login

> Email: tony@gmail.com<br/>
> Password: 123456<br/>

I have also added buttons that lets you sign in anonymously.

## :sparkles: Features

:heavy_check_mark: &nbsp;&nbsp;Display products with Pagination<br />
:heavy_check_mark: &nbsp;&nbsp;Detail page for informations about the selected product<br />
:heavy_check_mark: &nbsp;&nbsp;Advance product search and filtering using Ratings, Category and Price <br />
:heavy_check_mark: &nbsp;&nbsp;Add/Remove to/from "Cart" functionality<br />
:heavy_check_mark: &nbsp;&nbsp;Get Recommended products<br />
:heavy_check_mark: &nbsp;&nbsp;Beautiful UI Design<br />
:heavy_check_mark: &nbsp;&nbsp;JWT Cookie based Authentication<br />
:heavy_check_mark: &nbsp;&nbsp;User Sign In, Sign Up & Password Reset feature<br />
:heavy_check_mark: &nbsp;&nbsp;Use of Funtional Component with React hooks<br />
:heavy_check_mark: &nbsp;&nbsp;State management using Redux and Data persistence (Local storage)<br />
:heavy_check_mark: &nbsp;&nbsp;Responsive layout<br />
:heavy_check_mark: &nbsp;&nbsp;Swipeable product image gallery<br />
:heavy_check_mark: &nbsp;&nbsp;Cool loading spinner<br />
:heavy_check_mark: &nbsp;&nbsp;Support Stripe/PayPal secure server side payment<br />
:heavy_check_mark: &nbsp;&nbsp;Uses React Lazy loading and Suspense<br />
:heavy_check_mark: &nbsp;&nbsp;Also Integrated AI Voice Assistant to use the app<br />

## :rocket: Technologies

- [React](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [Redux](https://redux.js.org/)
- [Redux Thunk - Asynchronous Redux](https://github.com/reduxjs/redux-thunk)
- [Material UI](https://v4.mui.com/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Stripe API](https://stripe.com/docs)
- [PayPal](https://developer.paypal.com)
- [Mailtrap](https://mailtrap.io)
- [Heroku - Responsible for the deployment](https://www.heroku.com/)

## 📸 Screenshots

**Sign In**
![Screenshot of IG Sign In](https://res.cloudinary.com/ignitegaming/image/upload/v1641822017/projects/ECommerce%20App/localhost_3000__nty9ir.png)
<br/>

**Sign Up**
![Screenshot of IG Sign Up](https://res.cloudinary.com/ignitegaming/image/upload/v1641822017/projects/ECommerce%20App/localhost_3000__1_ggn5zi.png)
<br/>

**Homepage**
![Screenshot of IG Homepage](https://res.cloudinary.com/ignitegaming/image/upload/v1641822020/projects/ECommerce%20App/localhost_3000__3_wkxhum.png)
<br/>

**Product Detail**
![Screenshot of IG Product Detail](https://res.cloudinary.com/ignitegaming/image/upload/v1641822030/projects/ECommerce%20App/localhost_3000__2_ywp91h.png)
<br/>

**Product Search**
![Screenshot of IG Product Search](https://res.cloudinary.com/ignitegaming/image/upload/v1641822340/projects/ECommerce%20App/localhost_3000_search_bat_xkdtfd.png)
<br/>

<br/>

## 👨🏻‍💻 Run Locally

- Clone the project repo

```bash
  git clone https://github.com/sanyams0007/ignite-gaming
```

### Client Setup

1. From root of project Go to the client directory

   ```bash
       cd client
   ```

2. Install dependencies

   ```bash
       npm install
   ```

3. Create an `.env` file in the root of the client based on `.env.sample`.

4. Run client app

   ```bash
       npm start
   ```

### Server Setup

1. Go to the root of project and Install dependencies

   ```bash
       npm install
   ```

2. From root of project Go to the server directory

   ```bash
       cd server
   ```

3. Create a `config.env` in the `/server/config/` directory based on `.env.sample` in the directory.

4. Run server app

   ```bash
       node server.js
   ```

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.
