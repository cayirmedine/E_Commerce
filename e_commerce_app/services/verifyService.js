require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  console.log("PAYLOADDDD !!!!", payload);
  const email = payload.email;
  const givenName = payload.given_name;
  const familyName = payload.family_name;
  let data = {};
  data.email = email;
  data.fullName = givenName + " " + familyName;

  return data;
}

module.exports.googleVerifyService = async (token) => {
  try {
    let verifyInfo = await verify(token);
    return verifyInfo;
  } catch (error) {
    console.log("Error", error);
  }
};
