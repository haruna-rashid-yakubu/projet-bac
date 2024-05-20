# SmartBill


## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued learning](#continued-learning)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- Keep track of any changes

### Screenshot

![screenshot](./resources/preview.jpg)

### Built with

- HTML5, CSS3, JSX, and Sass for layout
- React, JavaScript, Hooks, and UUID for functionality
- Context API for state management
- Express, Node, and Config for backend
- MongoDB and Mongoose for storage
- Media queries to make responsive app
- Figma for design files
- CSSTransition for smooth transitions
- Axios to make requests
- Nodemon and Concurrently for development
- Heroku for deployment

### What I learned

I came into this challenge wanting to tackle a big project, and that's exactly what this turned out to be. I liked that it was fullstack, had a Figma file to imitate a professional work atmosphere, and allowed users a plethora of options to make the app very functional.

One thing I learned is to really break down the project into bite size pieces. This project was quite overwhelming in the beginning. There are a lot of files and instructions in this project, and taking the time to plan everything out was quite helpful.

Another thing that stood out with this project was the amount of time that I spent on the media queries to make the app responsive for mobile devices. I learned a lot about what works and what doesn't work, and how little changes here will affect something elsewhere if it isn't planned out properly.

Other little things that gave me problems included how to make the body background toggle in dark mode, how to properly use keys when mapping over an object, and how to get a div to be fixed inside another div that has scroll functionality.

This function, although simple in the end, brought sweet relief to issue that stumped me on and off for several days.

```js
const toggleDarkMode = () => {
  let newMode = !state.dark;
  newMode
    ? (document.body.style.backgroundColor = '#141625')
    : (document.body.style.backgroundColor = '#f8f8f8');
  dispatch({ type: DARK, payload: newMode });
};
```

### Future Scope

Mostly what I'd like to improve on future projects is the file/folder structure for my applications. I would like to be more consistent with where I put specific file types and what types of code goes in each of those files in order to give my projects a more professional feel. This is particularly true for Context API with State and Reducer.

