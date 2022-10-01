# FingerPaintr
No `paint` program? No problem. FingerPaintr will let you sketch on your pictures directly in the browser, no additional software required.
No login is required either - but if you make an account, you can save your pictures to an online gallery and have access to them anywhere you log in.

---

Have a picture but need to annotate it? Have a portrait you want to add horns and a mustache to for a quick laugh? Don't have an image editor and the user-policy won't let you install one?

FingerPaintr has you covered. Upload a picture, sketch on it directly in the browser, and download your modified image — no software download, no account required. But if you make an account, you can store your picutres and paintings in the cloud, only downloading them again once you've modified them to your liking.

Or such would be the theory, and the link would be here, but ![Heroku is shuttering their free program](https://techcrunch.com/2022/08/25/heroku-announces-plans-to-eliminate-free-plans-blaming-fraud-and-abuse/) so we're in the process of looking for a web host.


## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, MongoDB

**Packages/Dependencies used:** bcrypt, cloudinary, connect-mongo, dotenv, ejs, express, express-flash, express-session, method-override, mongodb, mongoose, morgan, multer, nodemon, passport, passport-local, validator

The bulk of this program uses local JavaScript to interact with the Canvas API. Uploading an image to the canvas, drawing on it, then downloading the sketched-up image: all local, in-browser JavaScript. This all happens in the browser on your local device - nothing goes back to the server unless you log in, and no images go to the server unless you upload them to your gallery.
This design decision was made with the express purpose of having a program that would be useable without logging in.

Even so, there are features for those who like making accounts for everything.
This program uses a local [Passport](https://www.passportjs.org/ 'Passport') solution to keep users' galleries separate.

Once users have logged in (or signed up, if they are first-time users), they have access to their gallery. Those who are not logged in can only access the drawing canvas, as well as the login or create account pages.

The data storage and management is handled with Mongoose and MongoDB, except for the image files themselves, which are hosted on Cloudinary.
Rendering out things is done with EJS, but the backbone of the thing is JavaScript: The drawing program is built with the canvas API, and the drawing program is the raison d'être of this program. Some static CSS to make things not hideous is planned at a future date but getting the program useable was top priority.

## Optimizations

Arguably not terrible for a solo project that isn't finished yet.
This is less than bare bones, though. If it were a construction project, there'd be sharp edges and exposed screws everywhere. OSHA would have a field day.
Planned features to implement for 1.0 include:

* The ability to upload your canvas contents *directly* to your gallery. As it stands, you can only upload images to the gallery from your local storage, and the only way to get the image out of the canvas is to download it to your local storage.
* CSS that isn't ugly. The current olive-green was selected from the IDE dropdown menu as the first color that wasn't optic and also the canvas would be visible against.
* Limitations on the gallery. Cloudinary will only let us store so much for free, and if this were hosted as-is someone would use it as a private photo library, surely.

Features after 1.0, to push even further beyond 
* Different brush shapes - currently, the only brush shape is a sort of scribble, and doesn't hold up very well at larger pixel sizes.
* Stamp-style brushes, complete with rotation, so you can put down specific shapes on your images instead of having to draw them all by hand
* Custom blank canvas sizes, so you can start with a blank canvas that is a different size other than 600x600 pixels
* Custom blank canvas *colors*, so you can have a starting color other than #FFFFFF. If you want it.
* A way to directly overwrite images in your gallery — currently, the only options are to upload to images and delete old ones, but the ability to directly overwrite an old image with a modified one would be nice.
* Patching that leak? Currently, whenever you download an image, the program leaks. The leak disappears when you refresh or go to another page, but it's the principle of the thing.
* Overhauling the drawing code for tablet support! The current version was built with the assumption you'd have a mouse - so while it *works* on a tablet, you can only draw one line at a time, and if you get at a point where the canvas fills the whole screen, you'll be stuck, since you have no way to scroll away. A way to fix this would be *either* multi-finger touch enables movement instead of drawing (which means no multi-finger drawing), *or* an on-screen widget that users can tap to escape the canvas (which would take up screen real estate, but allow for users to draw more than one line at once, which is the real spirit of finger painting.)

## Lessons Learned:

I had no experience with the canvas API before this project. So everything and anything that involves it was self-taught (and by "self-taught", I mean I went gallavanting across the internet to find the lamentations of other programmers who had used the canvas API before me.)
![The MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is still king as far as developer resources goes. Any big tech company tussling with Mozilla should consider that Mozilla going under means kneecapping their own developers.

## If you want to run this code yourself:

In addition to running `npm install` *or* putting this code in a cloud provider of your choice, you'll need a Mongo database to put this data in, and a connection to that database. You'll also need a Cloudinary account, along with your Cloud Name, API Key, and API Secret.

To do this locally:
- Create a `.env` file and add the following as `key: value` 
  - PORT: (can be any port, example: 3000) 
  - DB_STRING: `your database URI`
  - CLOUD_NAME: `Your Cloudinary Cloud name`
  - API_KEY: `Your Cloudinary API Key`
  - API_SECRET `Your Cloudinary API Secret`

If you're not running this locally, you're on your own - Doing this on a cloud provider will vary between providers (and presumably between UI updates.) If I get this thing hosted on a cloud provider at some point I'll update the README with instructions on how to host on that provider.
