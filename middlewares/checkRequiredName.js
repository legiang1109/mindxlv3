const checkRequiredName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is require" });
  next();
};

module.exports = checkRequiredName;
