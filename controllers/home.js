module.exports = {
	getIndex: (req, res) => {
	  //res.render("index.ejs", {innards: innards, canvas: canvas}); //TODO: Send this if the user is logged in, with personalization (such as name, chosen canvas contents) for them.
	  res.send("index.html"); //TODO: Only send this if user is not logged in.
	},
  };  