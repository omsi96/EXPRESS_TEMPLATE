import { Mentor, Profile, Student, Track, User } from "../../db/models";

export const updateProfileForAnyProfileType = async (req, res, next) => {
  try {
    const profile = req.user.getProfile();
    const { profileType } = req.user;
    const foundProfile = await Profile.findByPk(profile.profileId);
    if (!foundProfile) {
      let error = new Error(
        `Couldn't find  ${profileType}  with id ${profile.id}`
      );
      error.status = 404;
      next(error);
    }
    const updatedProfile = await foundProfile.update(req.body);

    // eager update
    let ProfileTypeModel = req.user.getProfileModel();
    const customProfile = await ProfileTypeModel.findByPk(profile.id);
    if (!customProfile) {
      let error = new Error(
        `Couldn't find ${profileType} with id ${profile.id}`
      );
      error.status = 404;
      next(error);
    }
    await customProfile.update(req.body);

    res.json({ updatedProfile, [profileType]: customProfile });
  } catch (error) {
    next(error);
  }
};
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
      attributes: ["id", "image", "name", "bio", "phone", "discordHandel"],
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
          include: [
            {
              model: Track,
              as: "track",
              attributes: ["name", "id", "meetingId"],
            },
          ],
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
          include: [
            { model: Track, as: "track", attributes: ["name", "meetingId"] },
          ],
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
