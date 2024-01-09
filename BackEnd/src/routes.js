import express from 'express';

import Users from './models/Users.js';
import Olt from './models/Olts.js';
import Slots from './models/Slots.js';
import bcrypt from 'bcrypt';

const router = express.Router();

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// Criar Novo Usuario (x)
router.post('/users', async (req, res) => {
  const user = req.body;

  const newUser = await Users.create(user);

  if (newUser) {
    res.json(newUser);
  } else {
    throw new HTTPError('Invalid data to create host', 400);
  }
});

// Criar Olt Route (x)
router.post('/olts', async (req, res) => {
  const olt = req.body;

  const newOlt = await Olt.create(olt);

  if (newOlt) {
    res.json(newOlt);
  } else {
    throw new HTTPError('Invalid data to create host', 400);
  }
});

// Delete Olt ByID (x)
router.delete('/olts/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (id && (await Olt.remove(id))) {
    res.sendStatus(200);
  } else {
    throw new HTTPError('Id is required to remove host', 400);
  }
});

// Criar Slots Route (x)
router.post('/slots', async (req, res) => {
  const slots = req.body;

  const newSlots = await Slots.create(slots);

  if (newSlots) {
    res.json(newSlots);
  } else {
    throw new HTTPError('Invalid data to create host', 400);
  }
});

// Get All Slots (x)
router.get('/slots', async (req, res) => {
  const slots = await Slots.readAll();

  res.json(slots);

})

// Get Slots ByID (x)
router.get('/slots/:id', async (req, res) => {
  const id = Number(req.params.id);

  const slot = await Slots.readIdSlot(id);

  if (id && slot) {
    res.json(slot);
  } else {
    throw new HTTPError('Invalid id to read host', 400);
  }
});

// Get Slots ByOltID (x)
router.get('/olts/:id/slots', async (req, res) => {
  const id = Number(req.params.id);

  const oltSlots = await Slots.readSlotsByOltID(id);

  if (id && oltSlots) {
    res.json(oltSlots);
  } else {
    throw new HTTPError('Invalid id to read host', 400);
  }
});

// Get All Users (x)
router.get('/users', async (req, res) => {
  const users = await Users.readAll();

  res.json(users);
});


// Get all OltsFound (x)
router.get('/olts', async (req, res) => {
  const olts = await Olt.readAll();

  res.json(olts);

})

// Get Olt ByID (x)
router.get('/olts/:id', async (req, res) => {
  const id = Number(req.params.id);

  const olt = await Olt.read(id);

  if (id && olt) {
    res.json(olt);
  } else {
    throw new HTTPError('Invalid id to read host', 400);
  }
});

// Get Olt iD byName (x)
router.get('/olts/id/:name', async (req, res) => {
  const name = req.params.name;

  const olt = await Olt.readName(name);
  if (name && olt) {
    res.json(olt);
  } else {
    throw new HTTPError('Invalid id to read host', 400);
  }
});

// Get User ByID (x)
router.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  const user = await Users.read(id);

  if (id && user) {
    res.json(user);
  } else {
    throw new HTTPError('Invalid id to read host', 400);
  }
});

// Get User ByUser(x)
router.post('/user', async (req, res) => {
  try {
    const usuario = req.body;
  
    const user = await Users.readByUser(usuario);
  
    if (user) {
      res.json(user);
    } else {
      res.json("Erro de Login")
    }
    
  } catch (error) {
    res.status(200).json({ error: 'Erro de Login' });
  }
});

// Update User ByID (x)
router.put('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  const user = req.body;

  if (id && user) {
    const newUser = await Users.update(user, id);

    res.json(newUser);
  } else {
    throw new HTTPError('Invalid data to update host', 400);
  }
});

// Delete User ByID (x)
router.delete('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (id && (await Users.remove(id))) {
    res.sendStatus(204);
  } else {
    throw new HTTPError('Id is required to remove host', 400);
  }
});

// Delete Olt ByID (x)
router.delete('/olts/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (id && (await Olt.remove(id))) {
    res.sendStatus(204);
  } else {
    throw new HTTPError('Id is required to remove host', 400);
  }
});


// Delete Slot ByID (x)
router.delete('/olts/:id/slots', async (req, res) => {
  const id = Number(req.params.id);
  if (id && (await Slots.remove(id))) {
    res.sendStatus(204);
  } else {
    throw new HTTPError('Id is required to remove host', 400);
  }
});

// 404 handler
router.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});


// router.post('/users', async (req, res) => {
//   const user = req.body;

//   delete user.confirmationPassword;

//   const newUser = await User.create(user);

//   delete newUser.password;

//   res.status(201).json(newUser);
// });


export default router;
