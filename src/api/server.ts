import dotenv from 'dotenv';
import {app} from './express';

dotenv.config();

const port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
