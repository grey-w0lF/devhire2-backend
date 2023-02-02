import asyncHandler from "express-async-handler";
import Profile from "../models/Profile.js";
import cloudinary from "cloudinary";

// @desc: Create A User Profile
// @route PATCH /api/profile/create-profile
// @private Route
//type:multi-part-form
// @grey_w0lf

const createProfile = (req, res) => {
  let profileFields = {
    social: {
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
      telegram: req.body.telegram,
      github: req.body.github,
    },
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
    user: req.user.id,
    avatar: req.body.avatar,
    email: req.user.email,
    company: req.body.company,
    website: req.body.website,
    location: req.body.location,
    status: req.body.status,
    bio: req.body.bio,
    openToWork: req.body.openToWork,
  };
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields }
        ).then((updated) => {
          return res.json(profileFields);
        });
      } else {
        // Profile.findOne({ name: profileFields.name }).then((profile) => {
        //   if (profile) {
        //     res.status(400).json({ message: "That handle already exists" });
        //   }
        new Profile(profileFields)
          .save()
          .then((profile) => res.json(profileFields));
        // });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      res.status(404).json({ message: "Not Found" });
      throw new Error("Profile Not Found");
    } else {
      res.status(200).json(profile);
    }
  } catch (error) {
    res.status(400).json({ message: "Something Bad Happened" });
    throw new Error("Something Bad Happened");
  }
});

const getProfileById = asyncHandler(async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id });
    if (!profile) {
      res.status(404).json({ message: "Profile Not Added " });
    } else {
      res.status(200).json(profile);
    }
  } catch (error) {
    res.status(400).json({ message: "Something Bad Happened" });
    throw new Error("Something Bad Happened");
  }
});

const getAllProfiles = asyncHandler(async (req, res) => {
  try {
    const profiles = await Profile.find();
    if (!profiles) {
      return res.status(404).json(errors);
    }
    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(404).json({ message: "There are no profiles" });
  }
});
export { createProfile, getUserProfile, getAllProfiles, getProfileById };
