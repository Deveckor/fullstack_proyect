const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8080;
const koderRoutes = require('./routers/koders');
const mentors = require('./routers/mentors')
const koders = koderRoutes.router;
const connection = koderRoutes.connect;





app.listen(port, async (req, res) => {
        await connection();
        console.log(`Server listening in port ${port}`);
})






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());
app.use('/koders', koders);
app.use('/mentors' , mentors)

    

