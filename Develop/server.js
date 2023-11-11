const express = require('express');
const fileSystem = require('fs');
const path = require('path');
const uniqueId = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fileSystem.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Unable to read notes.' });
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fileSystem.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Unable to read notes.' });
        } else {
            const notes = JSON.parse(data);
            newNote.id = uniqueId.v4();
            notes.push(newNote);
            fileSystem.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) {
                    res.status(500).json({ error: 'Unable to write notes.' });
                } else {
                    res.json(newNote);
                }
            });
        }
    });
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
