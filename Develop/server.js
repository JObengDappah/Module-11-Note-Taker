const express = require('express');
const html_Routes = require('./routes/html-routes');
const api_Routes = require('./routes/api-routes');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));
app.use(api_Routes);
app.use(html_Routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3001${PORT}!`);
});