var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');
var uuid = require('node-uuid');
var request = require('request');
var String = require('string');

var Config = require('../config/config');
var Constants = require('../constants');

var weedFS = require('../utils/weedFS');

router.get('/weed/volume/stats/disk', function (req, res) {
    if (req.query.address) {
        var url = req.query.address + Constants.weedApi.volume.statsDisk;
        if (url.indexOf('http://') == -1) {
            url = 'http://' + url;
        }
        request({url: url}, function (error, response, body) {
            if (error) {
                res.status(500).send({error: 'Request error!'});
            }
            else {
                if (response.statusCode == 200 && body) {
                    var data = JSON.parse(body);
                    res.status(200).send(data);
                }
                else {
                    res.status(500).send({error: 'Server error!'});
                }
            }
        });
    }
    else {
        res.status(404).send({error: 'No volume url!'});
    }
});

router.get('/weed/volume/status', function (req, res) {
    if (req.query.address) {
        var url = req.query.address + Constants.weedApi.volume.status;
        if (url.indexOf('http://') == -1) {
            url = 'http://' + url;
        }
        request({url: url}, function (error, response, body) {
            if (error) {
                res.status(500).send({error: 'Request error!'});
            }
            else {
                if (response.statusCode == 200 && body) {
                    var data = JSON.parse(body);
                    res.status(200).send(data);
                }
                else {
                    res.status(500).send({error: 'Server error!'});
                }
            }
        });
    }
    else {
        res.status(404).send({error: 'No volume url!'});
    }
});

router.get('/log/file/download', function (req, res) {
    if (!req.session.user) {
        res.status(401).send({error: 'User not authenticated!'});
        return;
    }
    var fid = req.query.fid;
    var filename = req.query.filename;
    if (fid && filename) {
        weedFS.read(fid, function (error, filePath) {
            if (error) {
                res.status(500).send({error: 'Server error!'});
            }
            else {
                if (filePath) {
                    var options = {
                        headers: {
                            'Content-Disposition': 'attachment; filename="' + filename + '.log"'
                        }
                    };
                    res.sendFile(filePath, options, function (error) {
                        // delete temporary file.
                        fs.unlink(filePath, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        });
                        if (error) {
                            res.status(error.statusCode).send({error: 'Server error!'});
                        }
                    });
                }
                else {
                    res.status(404).send({error: 'File not found!'});
                }
            }
        });
    }
    else {
        res.status(400).send({error: 'Param error!'});
    }
});

router.get('/log/attachment/view', function (req, res, next) {
    if (!req.session.user) {
        res.status(401).send({error: 'User not authenticated!'});
        return;
    }
    var id = req.query.id;
    if (id) {
        var url = Config.logfulApi + '/web/util/attachment/' + String(id).replace('.jpg', '');
        if (url.indexOf('http://') == -1) {
            url = 'http://' + url;
        }

        request({url: url}, function (error, response, body) {
            if (error) {
                res.status(500).send({error: 'Server error!'});
            }
            else {
                if (response.statusCode == 200) {
                    if (body) {
                        var fid = JSON.parse(body).fid;
                        if (fid) {
                            var resource = Config.weedMaster + '/' + fid;
                            if (resource.indexOf('http://') == -1) {
                                resource = 'http://' + resource;
                            }
                            var filePath = path.join(__dirname, '..', 'temporary/') + uuid.v4();
                            var stream = fs.createWriteStream(filePath);
                            stream.on('error', function (error) {
                                res.status(500).send({error: 'Server error!'});
                                res.end();
                            });
                            stream.on('open', function () {
                                request
                                    .get(resource)
                                    .on('error', function (error) {
                                        res.status(500).send({error: 'Server error!'});
                                        res.end();
                                    }).pipe(stream);
                            });
                            stream.on('close', function () {
                                var options = {
                                    headers: {
                                        'Content-type': 'image/jpeg'
                                    }
                                };
                                res.sendFile(filePath, options, function (error) {
                                    // delete temporary file.
                                    fs.unlink(filePath, function (error) {
                                        if (error) {
                                            console.log(error);
                                        }
                                    });
                                    if (error) {
                                        res.status(error.statusCode).send({error: 'Server error!'});
                                    }
                                });
                            });
                        }
                    }
                    else {
                        res.status(500).send({error: 'Server error!'});
                    }
                }
                else if (response.statusCode == 404) {
                    res.status(404).send({error: 'File not found!'});
                }
                else {
                    res.status(500).send({error: 'Server error!'});
                }
            }
        });
    }
    else {
        res.status(400).send({error: 'No fid!'});
    }
});

router.get('/log/attachment/download', function (req, res, next) {
    if (!req.session.user) {
        res.status(401).send({error: 'User not authenticated!'});
        return;
    }
    var id = req.query.id;
    if (id) {
        var url = Config.logfulApi + '/web/util/attachment/' + String(id).replace('.jpg', '');
        if (url.indexOf('http://') == -1) {
            url = 'http://' + url;
        }

        request({url: url}, function (error, response, body) {
            if (error) {
                res.status(500).send({error: 'Server error!'});
            }
            else {
                if (response.statusCode == 200) {
                    if (body) {
                        var fid = JSON.parse(body).fid;
                        if (fid) {
                            var resource = Config.weedMaster + '/' + fid;
                            if (resource.indexOf('http://') == -1) {
                                resource = 'http://' + resource;
                            }
                            var filePath = path.join(__dirname, '..', 'temporary/') + uuid.v4();
                            var stream = fs.createWriteStream(filePath);
                            stream.on('error', function (error) {
                                res.status(500).send({error: 'Server error!'});
                                res.end();
                            });
                            stream.on('open', function () {
                                request
                                    .get(resource)
                                    .on('error', function (error) {
                                        res.status(500).send({error: 'Server error!'});
                                        res.end();
                                    }).pipe(stream);
                            });
                            stream.on('close', function () {
                                var options = {
                                    headers: {
                                        'Content-type': 'image/jpeg'
                                    }
                                };
                                res.sendFile(filePath, options, function (error) {
                                    // delete temporary file.
                                    fs.unlink(filePath, function (error) {
                                        if (error) {
                                            console.log(error);
                                        }
                                    });
                                    if (error) {
                                        res.status(error.statusCode).send({error: 'Server error!'});
                                    }
                                });
                            });
                        }
                    }
                    else {
                        res.status(500).send({error: 'Server error!'});
                    }
                }
                else if (response.statusCode == 404) {
                    res.status(404).send({error: 'File not found!'});
                }
                else {
                    res.status(500).send({error: 'Server error!'});
                }
            }
        });
    }
    else {
        res.status(400).send({error: 'No fid!'});
    }
});

module.exports = router;