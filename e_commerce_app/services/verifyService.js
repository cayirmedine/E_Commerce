require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const https = require("https");

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const email = payload.email;
  const givenName = payload.given_name;
  const familyName = payload.family_name;
  let data = {};
  data.email = email;
  data.fullName = givenName + " " + familyName;

  return data;
}

const jwksRsaClient = jwksClient({
  jwksUri: "https://appleid.apple.com/auth/keys",
});

async function getAppleSignInKey(kid) {
  const key = await jwksRsaClient.getSigningKey(kid);
  return key.getPublicKey();
}

const verifyApple = async (json, publicKey) => {
  let verify = await jwt.verify(json, publicKey);
  return verify;
};

module.exports.googleVerifyService = async (token) => {
  try {
    let verifyInfo = await verify(token);
    return verifyInfo;
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports.facebookVerifyService = async (token) =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: "graph.facebook.com",
      path: `/me?access_token=${token}`,
      method: "GET",
    };
    try {
      const req = https.request(options, (res) => {
        res.on("data", (data) => {
          resolve(data.toString());
        });
      });
      req.on("error", (error) => {
        console.error(error);
      });
      req.end();
    } catch (error) {}
  });

module.exports.appleVerifyService = async (token) => {
  try {
    const json = jwt.decode(token, { complete: true });
    let kid = json.header.kid;
    let appleKey = await getAppleSignInKey(kid);
    return await verifyApple(token, appleKey);
  } catch (error) {}
};
