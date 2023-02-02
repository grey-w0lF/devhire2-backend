import mongoose from "mongoose";
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    company: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      default: "Your Primary Profession",
    },
    gender: {
      type: String,
      default: "Your Gender",
    },
    dob: { type: String, default: "DD/MM/YYYY" },
    skills: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
    },
    openToWork: {
      type: Boolean,
      default: false,
    },
    avatar: { type: String },
    social: {
      facebook: {
        type: String,
        required: false,
        default: "https://www.facebook.com/",
      },
      twitter: {
        type: String,
        required: false,
        default: "https://twitter.com/",
      },
      linkedin: {
        type: String,
        required: false,
        default: "https://www.linkedin.com/",
      },
      instagram: {
        type: String,
        required: false,
        default: "https://www.instagram.com/",
      },
      telegram: {
        type: String,
        required: false,
        default: "https://telegram.org/",
      },
      github: {
        type: String,
        required: false,
        default: "https://github.com/",
      },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("profiles", profileSchema);
export default Profile;
