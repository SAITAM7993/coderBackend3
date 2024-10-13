import { Router } from 'express';
import { UserServices } from '../services/user.services.js'; //de forma excepcional se agregan los llamados a los servicios para hacerlo mas sencillo por ser mocks
import { PetServices } from '../services/pet.services.js';
import { generatePetsMock } from '../mocks/pets.mock.js';
import { generateUsersMock } from '../mocks/user.mock.js';

const userServices = new UserServices();
const petsServices = new PetServices();
const router = Router();

//GENERA 100 MASCOTAS
router.get('/mockingpets', async (req, res, next) => {
  try {
    const pets = generatePetsMock(100);
    const response = await petsServices.createMany(pets); //metodo para guardar todos los pets a la vez
    res.status(201).json({ status: 'ok', payload: response });
  } catch (error) {
    error.path = '[GET] api/mocks/mockingpets';
    next(error);
  }
});

//GENERA 50 USUARIOS, para hacerlo mas sencillo se hace todo en esta parte, genera 50 usuarios
router.get('/mockingusers', async (req, res, next) => {
  try {
    const users = await generateUsersMock(50);
    const response = await userServices.createMany(users);

    res.status(201).json({ status: 'ok', payload: response });
  } catch (error) {
    error.path = '[GET] api/mocks/mockingusers'; //para poder tener una mejor info del error le indicamos en que endpoint fue
    next(error);
  }
});

//GENERA USUARIOS Y MASCOTAS SEGUN PARAMETROS DE ENTRADA
router.get('/generateData/:cu/:cp', async (req, res) => {
  try {
    const { cu, cp } = req.params;
    const users = await generateUsersMock(Number(cu)); //se pasa a number porque sino lo toma como char
    const pets = generatePetsMock(Number(cp));
    const usersResponse = await userServices.createMany(users);
    const petsResponse = await petsServices.createMany(pets);

    res
      .status(201)
      .json({ status: 'ok', payload: { usersResponse, petsResponse } });
  } catch (error) {
    error.path = '[GET] api/mocks/generateData';
    next(error);
  }
});

export default router;
