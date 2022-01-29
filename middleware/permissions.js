import passport from "passport";

export const isSignedIn = passport.authenticate("jwt", {
  session: false,
});

export const isMentor = (req, res, next) => {
  try {
    if (req.user.mentor != null) {
      req.mentorId = req.user.mentor.id;
      next();
    } else {
      next({
        message:
          "You should be signed in as a mentor in order to access this page!",
        status: 401,
      });
    }
  } catch (error) {
    let unauthorized = new Error(
      "You should be signed in as a mentor to access this endpoint!"
    );
    unauthorized.status = 401;
    next(unauthorized);
  }
};

export const isStudent = (req, res, next) => {
  if (req.user.student != null) {
    next();
  } else {
    next(
      new Error(
        "You should be signed in as a student in order to access this page!"
      )
    );
  }
};

export const disabled = (req, res, next) => {
  res.status(404).json({ message: "path not found!" });
};
