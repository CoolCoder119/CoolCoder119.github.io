const fs = require('fs');

var players = [
    player = {
        name: "Elias"
    }
    ,
    player2 =  {
        name: "Mateo"
    }
]

var TEXTS = {
    text: [
        "abc",
        "bla bla bla"
    ]
}


function jsonReader(filePath, cb) {
    fs.readFile(filePath,'utf-8', (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null,object);
        } catch (err){
            return cb && cb(err);
        }
    })
}

function toJSONFormat(text) {
    return JSON.stringify(text);
}





fs.writeFile('./playerInfo','./text.json', toJSONFormat(players[0]), err => {
    if (err) {
        console.log(err);
    } else {
        console.log("file succesfully written!");
    }
})