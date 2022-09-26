const Painting = require("../models/Painting");

module.exports = {
	getIndex: (req, res) => {
		console.log('Sending standard homepage');
		res.render("index.ejs");
	},
	getCanvas: async (req, res) => {
		console.log(`Sending ejs canvas to ${req.user.userName}`);
		if(req.params.canvasVal){
			try {
				const paintingObject = await Painting.findById(req.params.canvasVal);
				console.log(`paintingObject: ${paintingObject}`);
				console.log(`params.canvasVal: ${req.params.canvasVal}`);
				console.log(`_id: ${paintingObject.id}`);
				console.log(`image: ${paintingObject.image}`);
				res.render("canvas.ejs", {userName: req.user.userName, initCanvas: paintingObject.image || null});
			}
			catch (err) {
				console.log(err);
				console.log('Running a null canvas due to server error')
				res.render("canvas.ejs", {userName: req.user.userName, initCanvas: null});
			}
		}
		else {
			console.log('No image provided, so blank canvas.')
			res.render("canvas.ejs", {userName: req.user.userName, initCanvas: null});
		}
	},
  };  