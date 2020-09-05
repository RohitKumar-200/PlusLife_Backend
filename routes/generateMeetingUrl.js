const express = require('express');
const router = express.Router();
const request = require("request");

router.post('/', (req, res)=>{
    try {
    const code = req.body.code;
    const redirect_uri = req.body.redirect_uri;
    const grant_type = 'authorization_code';

    const options = {
        method: 'POST',
        url: `https://zoom.us/oauth/token?grant_type=${grant_type}&code=${code}&redirect_uri=${redirect_uri}`,
        headers: {
            Authorization: 'Basic ' + Buffer.from(process.env.ZOOM_CLIENT_ID + ':' + process.env.ZOOM_CLIENT_SECRET).toString('base64')
        }
    };
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        const accessToken = JSON.parse(body).access_token;

        const userOptions = {
            method: 'GET',
            url: 'https://api.zoom.us/v2/users/me',
            headers: {
                authorization: 'Bearer '+accessToken
            }
        }
        request(userOptions, (error, response, body) => {
            if (error) throw new Error(error);
            const meetingUrl = JSON.parse(body).personal_meeting_url;
            res.json({meetingUrl: meetingUrl});
        });
    });
    } catch (err) {
        res.status(400).json({"errorMessage": err});
    }
});

module.exports = router;