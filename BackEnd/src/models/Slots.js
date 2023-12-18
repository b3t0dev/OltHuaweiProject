import prisma from '../database/index.js';

async function create(slots) {
;
  const newSlots = await prisma.slotsOLT.create({
    data: slots
  });

  return newSlots;
}

async function readAll() {
  const slotsFound = await prisma.slotsOLT.findMany();

  return slotsFound;
}

async function readIdSlot(id) {
  const slots = await prisma.slotsOLT.findFirst({
    where: {
      id,
    },
  });

  return slots;
}

async function readSlotsByOltID(oltId) {
  const slots = await prisma.slotsOLT.findMany({
    where: {
      oltId,
    },
  });

  return slots;
}

async function update(host, id) {
  const newHost = await prisma.slotsOLT.update({
    data: host,
    where: {
      id,
    },
  });

  return newHost;
}

async function remove(id) {
  await prisma.slotsOLT.delete({
    where: {
      id,
    },
  });
  return true;
}

export default {
  create,
  readAll,
  readIdSlot,
  update,
  readSlotsByOltID,
  remove,
};
