import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app;