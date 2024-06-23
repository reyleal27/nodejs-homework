// const express = require('express')
import express from "express";
import { getAllContacts, getContactById, deleteContactById, updateContactById, updateStatusContact, addContact } from "../../controllers/contactsController.js";
import {ctrlWrapper} from "../../helper/ctrlWrapper.js";


const router = express.Router();

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(deleteContactById));

router.put("/:contactId", ctrlWrapper(updateContactById));

router.patch("/:contactId/favorite", ctrlWrapper(updateStatusContact));

// module.exports = router
export { router };
