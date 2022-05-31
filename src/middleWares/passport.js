const cookieParser = require("cookie-parser");
const cors = require("cors");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["auth"];
  }
  return token;
};
// const opts = {
//   jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//   secretOrKey: SECRET,
// };

const { SECRET } = require("../config/index");

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    "jwt",
    new JwtStrategy(options, (jwt_payload, done) => {
      try {
        console.log("jwt_payload", jwt_payload);
        done(null, jwt_payload);
      } catch (err) {
        done(err);
      }
    })
  );
  // passport.use(
  //   new Strategy(opts, async (payload, done) => {
  //     await Check_users(payload.user_id)
  //       .then(async (user) => {
  //         if (user) {
  //           return done(null, user);
  //         }
  //         return done(null, false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         done(null, false);
  //       });
  //   })
  // );
};
