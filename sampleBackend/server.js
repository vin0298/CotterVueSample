const express = require('express');
const app = express();
const port = 6000;

const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const axios = require("axios");

async function validateAccessToken(req, res, next) {
    try { 
        if (!("authorization" in req.headers)) {
            res.send(401).end("Missing Authorization header");
        }

        const auth = req.headers.authorization;
        const bearer = auth.split(" ");
        const accessToken = bearer[1];

        var cotterPublicKeys = await axios.default.get("https://www.cotter.app/api/v0/token/jwks");
        const jwk = cotterPublicKeys.data.keys[0];
        const pem = jwkToPem(jwk);

        jwt.verify(accessToken, pem, { algorithms: ["ES256"] }, function (err, decodedToken) {
            console.log(err);
            console.log(decodedToken);
            next();
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


app.get('/auth', validateAccessToken, (req, res) => {
    console.log("Success");
    res.send(200);
})



app.listen(port, () => console.log(`Sample Cotter Backend Auth app listening at http://localhost:${port}`));
