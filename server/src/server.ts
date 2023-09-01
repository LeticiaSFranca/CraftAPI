import express from 'express';
import { getIndex } from './controllers/index-controller.js';
import { getMobs } from './controllers/mob-controller.js';

const PORT = process.env.PORT || 3333;
const app = express();

app.get('/', getIndex);
app.get('/mobs', getMobs);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});