import { Mentor, Profile, Student, Track, User } from "../../db/models";
export const updateProfile = async (req, res, next) => {
  console.log("________\n\n\n\n", req.user.profileId);
  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  });
  // crud controller takes an id to update something
  // we are kinda hacking around by passing
  req.params.id = profile.id;
  next();
};

export const getSingleProfile = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const profile = await Profile.findByPk(id, {
      attributes: ["id", "image", "name", "bio", "phone"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["email"],
        },
        {
          model: Student,
          as: "student",
          attributes: ["id", "grade", "schoolName"],
        },
        {
          model: Mentor,
          as: "mentor",
          attributes: ["id", "status", "officeHours"],
          include: [{ model: Track, as: "track", attributes: ["name", "id"] }],
        },
      ],
    });
    if (profile) {
      profile.email = profile.user.email;
      res.json(profile);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  const { id } = req.user;
  console.log("USER: ", req.user);
  console.log(id);
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
      attributes: ["id", "image", "name", "bio"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["email"],
        },
        {
          model: Student,
          as: "student",
        },
        {
          model: Mentor,
          as: "mentor",
          include: [{ model: Track, as: "track", attributes: ["name"] }],
        },
      ],
    });
    if (profile) {
      profile.email = profile.user.email;
      res.json(profile);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};
