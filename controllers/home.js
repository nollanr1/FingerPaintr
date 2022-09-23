module.exports = {
	getIndex: (req, res) => {
		console.log('Sending standard homepage');
		res.render("index.ejs");
	},
	getCanvas:(req, res) => {
		console.log(`Sending ejs canvas to ${req.user.userName}`);
		res.render("canvas.ejs", {userName: req.user.userName/*, canvas: canvas*/}); //TODO: Send this if the user is logged in, with personalization (such as name, chosen canvas contents) for them.
	},
  };  