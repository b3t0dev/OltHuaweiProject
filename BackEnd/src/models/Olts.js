import prisma from '../database/index.js';

async function create(olt) {
;
  const newOlt = await prisma.oltFound.create({
    data: olt
  });

  return newOlt;
}

async function readAll() {
  const oltsFound = await prisma.oltFound.findMany();

  return oltsFound;
}

async function read(id) {
  const host = await prisma.oltFound.findFirst({
    where: {
      id,
    },
  });

  return host;
}

async function update(host, id) {
  const newHost = await prisma.User.update({
    data: host,
    where: {
      id,
    },
  });

  return newHost;
}

async function remove(id) {
  await prisma.User.delete({
    where: {
      id,
    },
  });
}

export default {
  create,
  readAll,
  read,
  update,
  remove,
};
