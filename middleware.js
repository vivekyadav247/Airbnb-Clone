const Listing = require("./models/listing")
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const { listingSchema , reviewSchema} = require("./schema");


// Middleware of Authenticate to check user is login or not
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do that");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!res.locals.currUser._id.equals(listing.owner._id)){
      req.flash("error", "Access Denied ! Only Owner can Access");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

// Middleware for Validate Listing Schema
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware for Validate Review Schema
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middlleware for checking author of review
module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error", "Access Denied ! Only Author can Access");
      return res.redirect(`/listings/${id}`);
    }
    next();
};