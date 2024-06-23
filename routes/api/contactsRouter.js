// const express = require('express')

import express from "express";
import {listContacts, getContactById,removeContact, addContact, updateContact}from '../../models/contacts.js';
import { httpError } from "../../helper/httpError.js";
import { contactValidation } from "../../validation/validation.js";


const router = express.Router();

router.get("/", async (_req, res,next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error)
  }
});


// router.get("/:contactId", ctrlwrapper(getContactById));
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw httpError(404, "Contact ID not found")
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactValidation.validate(req.body);
    if (error) {
      throw httpError(400, "missing required name field");
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
});


router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    
    if (!result) {
      throw httpError(404);
    }
    res.json({message: "Contact deleted"});
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async(req,res, next) => {
  try {
    const { error } = contactValidation.validate(req.body);
    if (error) {
      throw httpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      throw httpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
});

// module.exports = router
export { router };
