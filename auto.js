const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.send("Tool dang chay roi :))")
});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


var request = require('request')
var fs = require('fs')

//var cookie = fs.readFileSync('./cookie.txt').toString()
var cookie = process.env.Cookie

function Shopee(url, method, json, isContinue) {
    var headers = {
        'x-csrftoken': 'ihHMdA5PyVa6ITXE5GlqCumucsOiuUFn',
        'x-api-source': 'rn',
        'x-shopee-language': 'vi',
        'accept': 'application/json',
        'content-type': 'application/json',
        'if-none-match-': '55b03-afb69e438c4b48e93e5e3a9f7e6a9111',
        'cookie': cookie,
        'user-agent': 'Android app Shopee appver=25930 app_type=1'
    }

    var request_form = {
        url: url,
        headers: headers,
        json: json,
        method: method
    }
    request(request_form, (err,res,body) => {
        if (body.code == 0) {
            console.log("SUCCESS")
        }
        if (isContinue) {
            var tuoiNuoc = {
                url: 'https://games.shopee.vn/farm/api/orchard/crop/water',
                headers: headers,
                json: {
                    "cropId": body.data.crops[0].id,
                    "resourceId": body.data.resources[0].id
                },
                method: 'POST'
            }
            request(tuoiNuoc, (err,res,data) => {
                console.log(data)
            })
        }
    })
}
setInterval(function() {
    Shopee('https://shopee.vn/mkt/coins/api/v2/checkin', 'POST', true, false)
}, 21600000)

setInterval(function() {
    Shopee('https://games.shopee.vn/farm/api/orchard/context/get?deviceId=cpKlrpp16DpWJqyQ1GLX4Ev6Fv8HYSu7CfaEWMV1DGQ%3D&skipGuidance=0',
    'GET', true, true)
}, 300000)
