const router = require('express').Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

router.get('api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(dbJson);
});

router.post('api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("./db/db.json", JSON.stringify(dbJson));
    res.json(dbJson);
});

router.delete('api/notes/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const dataJson = Json.parse(data);
    const newNotes = dataJson.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
    res.json("Notes deleted");
});

module.exports = router;