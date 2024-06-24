import { httpError } from "../helper/httpError.js";
import { contactValidation, favoriteValidation } from "../validation/validation.js";
import { Contact } from "../models/contactModels.js";

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 20, favorite } = req.query;
  const query = favorite ? { favorite: true } : {};

  const result = await Contact.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw httpError(404, "Contact ID not found")
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
      throw httpError(400, "missing required field")
  }
  const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteContactById =async (req, res) => {
    const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw httpError(404);
  }
    res.json({ message: "Contact deleted" });
};

const updateContactById = async (req, res) => {
 
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing fields")
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw httpError(404)
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { error } = favoriteValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing field favorite");
  }

  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404)
  }
  res.json(result);
};


export { getAllContacts, getContactById, addContact, deleteContactById, updateContactById, updateStatusContact};
