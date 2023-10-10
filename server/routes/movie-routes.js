const express = require("express");
const movieController = require("../controllers/movie-controller");
const multer = require("multer");
const uuid = require("uuid");

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		const __projectDest = __dirname.slice(0, __dirname.indexOf("back") + "back".length);
		callback(null, __projectDest + "\\images");
	},
	filename: function (req, file, callback) {
		const fileFormat = file.originalname.slice(file.originalname.lastIndexOf("."));
		const filename = `file_${uuid.v4()}${fileFormat}`;
		callback(null, filename);
	},
});

const uploadImg = multer({
	storage: storage,
	limits: {
		fileSize: 20971520, // 20 MB
	},
});

router.get("/", movieController.getMovies);
router.delete("/", movieController.deleteMovie);
router.patch("/", movieController.updateMovie);

router.post("/", uploadImg.single("image"), movieController.addMovie);

module.exports = router;
