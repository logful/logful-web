var express = require('express');
var router = express.Router();
var fs = require('fs');

var weedFS = require('../utils/weedFS');

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

module.exports = router;