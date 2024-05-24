const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
    const data = req.body;

   
    const filePath = path.join(__dirname, 'database.json');

    
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Unable to read file.' });
        }

        let jsonData = [];
        if (fileData) {
            jsonData = JSON.parse(fileData);
        }

        
        jsonData.push(data);

       
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Unable to write to file.' });
            }

            res.json({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
