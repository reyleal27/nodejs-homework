// const express = require('express')
// const logger = require('morgan')
// const cors = require('cors')
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import { router as usersRouter } from "./routes/api/usersRouter.js";
import { router as contactsRouter } from "./routes/api/contactsRouter.js";
// const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

//http://localhost:3000/api/users
app.use("/api/contacts", contactsRouter)
app.use("/api/users", usersRouter)


app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message })
})



export { app };
// module.exports = app
