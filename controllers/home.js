module.exports = {
	getIndex: (req, res) => {
		console.log('Sending standard homepage');
		res.render("index.ejs");
	},
	getCanvas:(req, res) => {
		console.log(`Sending ejs canvas to ${req.user.userName}`);
		res.render("canvas.ejs", {userName: req.user.userName, initCanvas: "https://placekitten.com/600/600"/*req.canvasVal*/}); //TODO: Pass the canvas initialization link
	},
  };  