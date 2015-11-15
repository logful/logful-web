var uuid = require('node-uuid');
var path = require("path");
var fs = require('fs');
var request = require('request');

var config = require('../config/config');

var weedFS = {
    read: function (fid, callback) {
        var randomName = uuid.v4();
        var temporary = path.join(__dirname, '..', 'temporary/');
        var filePath = temporary + randomName;

        var url = config.weedMaster + '/' + fid;
        if (url.indexOf('http://') == -1) {
            url = 'http://' + url;
        }

        request({url: url}, function (error, response, body) {
            if (error) {
                callback(error, null);
            }
            else {
                if (response.statusCode == 200 && body) {
                    var stream = fs.createWriteStream(filePath);
                    stream.on('error', function (error) {
                        callback(error, filePath);
                    });
                    stream.write(body);
                    stream.end(function () {
                        callback(null, filePath);
                    });
                }
                else {
                    callback(null, null);
                }
            }
        });
    }
};

module.exports = weedFS;