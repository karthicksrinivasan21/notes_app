const express = require('express')
const app = express()
const connectDB = require('./config/db');
const dotEnv = require('dotenv');
const errorHandler = require('./middleware/error');

//Load env vars
dotEnv.config({path:'./config/.env'});

app.use(express.json());

connectDB();

const userRouter = require('./routes/users'); 
const authRouter = require('./routes/auth');
const noteRouter = require('./routes/note');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notes', noteRouter);


app.use(errorHandler);
  // Start the server
  const PORT = process.env.PORT || 3000; // Set port number, use environment variable PORT if available, otherwise use 3000
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });