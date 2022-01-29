const {
  User,
  Profile,
  Student,
  Mentor,
  Track,
  CohortGroup,
  Cohort,
  Meeting,
} = require("../../db/models");
const { hashPassword } = require("./auth.helper");
const JWT = require("jsonwebtoken");
const { JWT_EXPIRATION_DATE, JWT_SECRET } = require("../../config/keys");

export const newUserQuery = [
  {
    model: Profile,
    as: "profile",
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Student,
        as: "student",
        // attributes: ["id"],
      },
      {
        model: Mentor,
        as: "mentor",
        include: [
          {
            model: Track,
            as: "track",
            attributes: ["meetingId"],
          },
        ],
      },
    ],
  },
];

const createStudentOrMentor = async (userType, user, profileId) => {
  let profile = { ...user, profileId };
  if (userType == "student") {
    return await Student.create(profile);
  } else if (userType == "mentor") {
    return Mentor.create(profile);
  }
};

const validateSignUpRequest = (body) => {
  let errors = [];
  if (!body.email) {
    errors.push("email");
  }
  if (!body.name) {
    errors.push("name");
  }
  if (!body.userType) {
    errors.push("userType");
  } else if (body.userType != "student" && body.userType != "mentor") {
    errors.push("userType has to be either a `student` or a `mentor`");
  }
  if (errors.length == 0) {
    return null;
  }
  return errors;
};

const setUserImage = (profile) => {
  profile.update({
    image: `https://ui-avatars.com/api/?background=4973E3&name=${profile.name}`,
  });
};

export const createUser = async (req, res, next) => {
  try {
    const { userType } = req.body;
    const hashedPassword = hashPassword(req.body.password);
    req.body.password = hashedPassword;
    req.body.email = req.body.username;
    let errors = validateSignUpRequest(req.body);
    if (errors) {
      res.status(400).json({ missingFields: errors });
    }
    console.log("USER:", User);
    // user image
    const user = await User.create(req.body);
    // Assosiate User to Profile
    const profile = await Profile.create({ userId: user.id, ...req.body });
    const mentorOrStudent = await createStudentOrMentor(
      userType,
      req.body,
      profile.id
    );
    const user2 = await User.findByPk(user.id, {
      include: newUserQuery,
    });
    setUserImage(user2.profile);
    const jwt = tokenObject(user2, userType);
    console.log("User fetched: ", jwt);
    res.status(201).json({ accessToken: jwt.token, user: user2 });
  } catch (error) {
    console.log("I AM SIGN UP NEXT", error);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  console.log("User signed in ", req.user);
  try {
    const user = await User.findByPk(req.user.id, { include: newUserQuery });
    const cohorts = await CohortGroup.findAll({
      where: { userId: user.id ?? -1 },
      include: [
        {
          model: Cohort,
          as: "cohort",
          include: [
            {
              model: Meeting,
              as: "meeting",
            },
          ],
        },
      ],
    });
    const accessToken = tokenObject(req.user).token;
    res.json({ accessToken, user, cohorts });
  } catch (error) {
    next(error);
  }
};
export const resetPass = async (req, res, next) => {
  try {
    if (!req.body.resetCode || req.body.resetCode.length < 30) throw "error";
    const user = await User.findOne({
      where: { resetCode: req.body.resetCode },
      include: newUserQuery,
    });

    if (!user) throw "error";
    const hashedPassword = hashPassword(req.body.password);
    await user.update({ resetCode: null, password: hashedPassword });
    const accessToken = tokenObject(user).token;
    const cohorts = await CohortGroup.findAll({
      where: { userId: user.id ?? -1 },
      include: [
        {
          model: Cohort,
          as: "cohort",
          include: [
            {
              model: Meeting,
              as: "meeting",
            },
          ],
        },
      ],
    });
    res.json({ accessToken, user, cohorts });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, { include: newUserQuery });
    const cohorts = await CohortGroup.findAll({
      where: { userId: user.id ?? -1 },
      include: [
        {
          model: Cohort,
          as: "cohort",
          include: [
            {
              model: Meeting,
              as: "meeting",
            },
          ],
        },
      ],
    });

    res.json({ user, cohorts });
  } catch (error) {
    next(error);
  }
};

const tokenObject = (user) => ({
  token: jwt(user),
});
const jwt = (user) => {
  console.log("Creating new JWT:", user);
  const payload = () => ({
    id: user.id,
    email: user.email,
    name: user.name,
    student: user.profile.student,
    mentor: user.profile.mentor,
    userType: user.userType,
    exp: Date.now() + JWT_EXPIRATION_DATE,
  });

  return JWT.sign(JSON.stringify(payload()), JWT_SECRET);
};
