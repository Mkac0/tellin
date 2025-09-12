# tellin'
![tellin'](https://i.imgur.com/j4j5zz9.png)

## What is tellin CRUD app?
The tellin' CRUD app is a social blog site, where you can sign up, sign in, sign out and post your best photos, poems, short stories, etc.

## Why tellin'?
tellin' is a good way to express your creativity and see what others have to show.

## Attributions

### Express.js
While working on this project, one of my challenges was trying to determine which attributes, properties and elements to use. Some of the things I learned and implimented were:
  + Define a route for HTTP GET requests at the path '/'. The callback is async so you can await inside it.
      ``router.get('/', async (req, res, next) => { ... })``
      For more information on Express App Routing, visit [Express Routing](https://expressjs.com/en/guide/routing).
  + Projection, which fetches all users, returning only the username field ({ username: 1 } inside the
      ``try { ... }: const users = await User.find({}, { username: 1 })``
      For more information on Routes and Controllers, visit [MDN: Express Tutorial](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs).
  + Using Mongoose, ``.lean()`` returns plain JavaScript objects rather than full Mongoose documents, which improves performance if you just need data.
      ``.lean()``
      For more information on using `.lean()`, visit [MDN: Express Tutorial](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs).
  + Middleware Function in Express.js, which is used to making the authenticated user available to templates.
      ++ Exporting `passUserToView` lets you plug this middleware into your application (e.g. `app.use(passUserToView)`), so for every request you’ll have `res.locals.user` set appropriately, which means in views (templates) you can refer to user without passing it manually each time.
    For more information on Express.js Middleware Function, visit [Express/Node Instroduction](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction).
  + Mongoose model (User) with an embedded schema (postSchema) so you can store and work with users and their posts in MongoDB, which demonstrates the following:
      ++ Defining a subdocument schema `postSchema`.
      ++ Defining a parent schema `userSchema`.
      ++ Compiling the schema into a model `mongoose.model`.
    ++ Mongoose model (User) with an embedded schema (postSchema) so you can store and work with users and their posts in MongoDB.
    For more information on Mongoose model, viti [MDN:Express Tutorial Part 3: Using a Database (with Mongoose)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose).

### HTML `<textarea>`
  + The `oninput` attribute ensures that whenever the user types, deletes, or otherwise changes the content, the autoResize function is called.
      ++ `<%= post.description %>` is server-side templating (EJS) that fills the textarea with the description of the current post.
    For more information on Input Events, visit [MDN:HTML input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
  + JavaScript Functions - `textarea.scrollHeight` gives the pixel height of the content inside the textarea.
    For more information on `textarea.scrollHeight`, viti [The textarea element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea).
      ++ Resetting first to `auto` avoids endlessly growing the box.
      ++ Then the height is set to the content’s scroll height, making the textarea expand or shrink to fit text.
    For more information on `scrollingHeight`, visit [MDN:Scrolling Height Property](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight).
      ++ Event listener on `DOMContentLoaded`, which is when the page finishes loading, the script applies `autoResize` to all textareas so they start at the correct height even before the user types.
    Form more information on DOMContentLoaded event, visit [MDN:DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event).

### EJS Syntax, loops and arrays
  + The `posts.forEach((post) => { ... })` loops over the posts array, generating one <li> for each post.
      ++ Conditional classes, if only one post exists, add "horizontal" to the class list:
        `` <%= posts.length === 1 ? 'horizontal' : '' %> ``
    For more information on `Array.prototype.forEach`, vsit [MDN:Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).
  + Dynamic attributes and conditional rendering, using `post.image`, which renders an `<img>` tag. And, The `onerror="this.style.display='none'"`, which hides the image if it fails to load.
    For more information on `<img>` the Image Embeded Element, visit [MDN:<img> Image Embeded Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img).

## Technologies Used
+ HTML
+ JavaScript
+ CSS
+ EJS

## Next Steps
I plan on including more exciting features, such as likes, comments, and timeline page.
