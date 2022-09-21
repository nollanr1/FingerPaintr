module.exports = {
	getIndex: (req, res) => {
	  //res.render("index.ejs");
	  res.send("index.html"); //TODO: Only send this if user is not logged in. This is the default page.
	  //
	},
  };  