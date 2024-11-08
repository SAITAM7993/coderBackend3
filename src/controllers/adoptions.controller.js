// import { adoptionsService, petsService } from "../services/index.js"
import { UserServices } from '../services/user.services.js';
import { PetServices } from '../services/pet.services.js';
import { AdoptionServices } from '../services/adoption.services.js';

export class AdoptionsController {
  constructor() {
    this.adoptionsService = new AdoptionServices();
    this.usersService = new UserServices();
    this.petsService = new PetServices();
  }

  getAllAdoptions = async (req, res, next) => {
    try {
      const result = await this.adoptionsService.getAll();
      res.send({ status: 'success', payload: result });
    } catch (error) {
      error.path =
        '[GET] api/adoptions/ (adoptions.controller/getAllAdoptions)';
      next(error);
    }
  };

  getAdoption = async (req, res, next) => {
    try {
      const aid = req.params.aid;
      const adoption = await this.adoptionsService.getById(aid);
      if (!adoption)
        return res
          .status(404)
          .send({ status: 'error', error: 'Adoption not found' });
      res.send({ status: 'success', payload: adoption });
    } catch (error) {
      error.path =
        '[GET] api/adoptions/:aid (adoptions.controller/getAdoption)';
      next(error);
    }
  };

  deleteAdoption = async (req, res, next) => {
    try {
      const { aid } = req.params; // El único parámetro es el ID de la adopción
      // Obtener los datos de la adopción
      const adoption = await this.adoptionsService.getById(aid);
      if (!adoption)
        return res
          .status(404)
          .send({ status: 'error', error: 'Adoption not found' });

      const { owner, pet } = adoption;

      // Obtener al usuario
      const user = await this.usersService.getById(owner);
      if (!user)
        return res
          .status(404)
          .send({ status: 'error', error: 'User not found' });

      // Obtener la mascota
      const petData = await this.petsService.getById(pet);
      if (!petData)
        return res
          .status(404)
          .send({ status: 'error', error: 'Pet not found' });

      // Verificar que la mascota esté adoptada
      if (!petData.adopted)
        return res
          .status(400)
          .send({ status: 'error', error: 'Pet is not adopted' });

      // Verificar que la mascota esté asociada con el usuario
      if (petData.owner.toString() !== user._id.toString())
        return res
          .status(400)
          .send({ status: 'error', error: 'Pet does not belong to this user' });

      // Quitar la mascota del array de pets del usuario
      console.log(user.pets.toString());
      console.log(petData._id.toString());

      user.pets = user.pets.filter((petId) => !petId.equals(petData._id)); //recontra importante esto, como es objectid no funcionaba el filtrado y quedaba con la mascota asignada

      // Actualizar el usuario con el nuevo array de pets
      await this.usersService.update(user._id, { pets: user.pets });

      // Actualizar la mascota, ponerla como no adoptada y quitar el owner
      await this.petsService.update(petData._id, {
        adopted: false,
        owner: null,
      });

      // Eliminar la adopción
      await this.adoptionsService.remove(aid);

      res.send({ status: 'success', message: 'Adoption removed successfully' });
    } catch (error) {
      error.path =
        '[DELETE] api/adoptions/:adoptionId (adoptions.controller/deleteAdoption)';
      next(error);
    }
  };

  createAdoption = async (req, res, next) => {
    try {
      const { uid, pid } = req.params;
      const user = await this.usersService.getById(uid);
      if (!user)
        return res
          .status(404)
          .send({ status: 'error', error: 'user Not found' });
      const pet = await this.petsService.getById({ _id: pid });
      if (!pet)
        return res
          .status(404)
          .send({ status: 'error', error: 'Pet not found' });
      if (pet.adopted)
        return res
          .status(400)
          .send({ status: 'error', error: 'Pet already adopted' });
      user.pets.push(pet._id);
      await this.usersService.update(user._id, { pets: user.pets });
      await this.petsService.update(pet._id, {
        adopted: true,
        owner: user._id,
      });
      const adoption = await this.adoptionsService.create({
        owner: user._id,
        pet: pet._id,
      });
      res.send({ status: 'success', payload: adoption });
    } catch (error) {
      error.path =
        '[POST] api/adoptions/:uid/:pid (adoptions.controller/createAdoption)';
      next(error);
    }
  };
}
