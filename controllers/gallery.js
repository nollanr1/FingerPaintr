const cloudinary = require("../middleware/cloudinary");
const Painting = require("../models/Painting");

module.exports = {

	// logParams: async (req, res) => {
	// 	console.log(req.params);
	// 	console.log(req.file);
	// 	res.redirect("/canvas");
	// },

	getGallery: async (req, res) => {
		try{
			console.log(`Now rendering out the gallery belonging to ${req.user.userName}`);
			const galleryContents = await Painting.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
			res.render("gallery.ejs", {userName: req.user.userName, galleryContents: galleryContents});
		}
		catch (err) {
			console.log(err);
		}
	},
	addToGallery: async (req, res) => {
		try {
		  // Upload image to cloudinary
		  if(req.file){
			console.log(req.file.path);
		  }
		  else if(req.body.dataUrl){
			console.log('There is a dataURL but of course it will be massive so we will not be logging it.');
		  }else{
			console.log(req);
			console.log("There's no file?");
			throw new Error('ERR33: No file was provided for gallery upload');
		  }
		  //If a file upload exists, use that, else use the drawing in the body.
		  const result = await cloudinary.uploader.upload(req.file ? req.file.path : req.body.dataUrl);
		  await Painting.create({
			title: 'Untitled Painting',
			image: result.secure_url,
			cloudinaryId: result.public_id,
			user: req.user.id,
		  });
		  console.log(`Painting has been added to ${req.user.userName}'s gallery!`);
		  //res.redirect(`/gallery/rename/${Painting._id}`);
		  res.redirect(`/gallery`);
		} catch (err) {
		  console.log(err);
		  res.redirect(`/canvas`);
		}
	},
	getNameForm: async (req, res) => {
		const painting = await Painting.findById(req.params.id);
		res.render("nameForm.ejs", {painting: painting});
	},
	updateName: async (req, res) => {
		try {
		  // Find the painting by id, and change the name
		  await Painting.findOneAndUpdate({ _id: req.params.id }, {
			title: req.body.title
		  });
		  console.log(`Name ${req.body.title} assigned to Painting ${req.params.id}`);
		  res.redirect("/gallery");
		} catch (err) {
		  res.redirect("/gallery");
		}
	  },
	deleteFromGallery: async (req, res) => {
		try {
		  // Find the painting by id
		  let painting = await Painting.findById({ _id: req.params.id });
		  // Delete image from cloudinary
		  await cloudinary.uploader.destroy(painting.cloudinaryId);
		  // Delete post from db
		  await Painting.deleteOne({ _id: req.params.id });
		  console.log("Deleted Painting");
		  res.redirect("/gallery");
		} catch (err) {
		  res.redirect("/gallery");
		}
	  },
}; 