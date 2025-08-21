const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../controller/listings.js");
const multer = require("multer");
const {storage} = require("../cloudinaryConfig.js")
const upload = multer({ storage });
// Index route (Main Page)
router.route("/")
  .get(wrapAsync(listingsController.index))
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingsController.createListing));

// New route
router.get("/new", isLoggedIn, listingsController.renderNewForm);

// Show Route
router.
route("/:id")
  .get(wrapAsync(listingsController.showListings))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingsController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));

// // Create Route
// router.post(
//   "/",
//   validateListing,
//   wrapAsync(listingsController.createListing)
// );

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditForm)
);

// Update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingsController.updateListing)
// );

// DELETE Route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingsController.deleteListing)
// );

module.exports = router;
