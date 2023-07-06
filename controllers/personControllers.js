const persons = require("../models/persons.json");

const getAllPerson = (req, res) => {
  res.send(persons);
};
const createPerson = (req, res) => {
  const { name } = req.body;

  res.json({ name });
};
const updatePerson = (req, res) => {
  const { name } = req.body;

  res.json({ name });
};
const deletePerson = (req, res) => {
  const { name } = req.body;

  res.json({ name });
};

module.exports = { getAllPerson, createPerson, updatePerson, deletePerson };
