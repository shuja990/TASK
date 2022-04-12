const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
};

const handleProfilEdit = (req, res, db) => {
  const { image, name, counter, email } = req.body;
  const update = {
    counter: counter,
    name: name,
    image: image,
  }
  db("users")
    .update(update)
    .where('email','=',email)
    .then(u => res.status(!!u?200:404).json({success:!!u}))
    .catch(e => res.status(500).json(e));
};

const getUsers = (req, res,db) => {
  db.select("*")
    .from("users")
    .then((user) => {
      if (user.length) {
        res.json(user);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
};

const handleProfilDelete = (req, res, db) => {
  const { id } = req.params;
  db("users")
  .del()
  .where('id','=',id)
    .then(u => res.status(res.json(u)))
    .catch(e => res.status(500).json(e));
};


module.exports = {
  handleProfileGet,
  handleProfilDelete,
  getUsers,
  handleProfilEdit,
};
