const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const galleryController = require("../controllers/gallery")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", ensureGuest, homeController.getIndex);
router.get("/canvas", ensureAuth, homeController.getCanvas);
router.get("/canvas/:canvasVal", ensureAuth, homeController.getCanvas);

router.get("/paramsLogger/:params", ensureAuth, galleryController.logParams);
router.post("/paramsLogger/:params", ensureAuth, galleryController.logParams);

router.get("/gallery", ensureAuth, galleryController.getGallery); //TODO, MAYBE, SOMEDAY: Viewing other people's galleries if you have permission.
router.post("/gallery", ensureAuth, galleryController.addToGallery);
router.get("/gallery/rename/:id", ensureAuth, galleryController.getNameForm);
router.put("/gallery/rename/:id", ensureAuth, galleryController.updateName);
router.delete("/gallery/:id", ensureAuth, galleryController.deleteFromGallery);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;