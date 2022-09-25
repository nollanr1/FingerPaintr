const cloudinary = require("../middleware/cloudinary");
const Painting = require("../models/Painting");

module.exports = {
	getGallery:(req, res) => {
		console.log(`Now rendering out the gallery belonging to ${req.user.userName}`);
		res.render("gallery.ejs", {userName: req.user.userName, galleryContents: galleryContents});
	},
	addToGallery: async (req, res) => {
		try {
		  // Upload image to cloudinary
		  const result = await cloudinary.uploader.upload(req.file.path);
		  await Painting.create({
			title: req.body.title || 'Untitled Painting',
			image: result.secure_url,
			cloudinaryId: result.public_id,
			caption: req.body.caption,
			user: req.user.id,
		  });
		  console.log(`Painting ${req.body.title} has been added to ${req.user.id}'s gallery!`);
		  res.redirect(`/gallery/rename/${Painting._id}`);
		} catch (err) {
		  console.log(err);
		}
	},
	getNameForm: async (req, res) => {
		//TODO: Actually pass the URL, not the ID
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