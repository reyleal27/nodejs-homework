// const express = require('express')
import express from "express";
import { getAllContacts, getContactById, deleteContactById, updateContactById, updateStatusContact, addContact } from "../../controllers/contactsController.js";
import {ctrlWrapper} from "../../helper/ctrlWrapper.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/",authenticateToken, ctrlWrapper(getAllContacts));

router.get("/:contactId", authenticateToken, ctrlWrapper(getContactById));

router.post("/", authenticateToken, ctrlWrapper(addContact));

router.delete("/:contactId",authenticateToken, ctrlWrapper(deleteContactById));

router.put("/:contactId", authenticateToken, ctrlWrapper(updateContactById));

router.patch("/:contactId/favorite",authenticateToken, ctrlWrapper(updateStatusContact));

// module.exports = router
export { router };
