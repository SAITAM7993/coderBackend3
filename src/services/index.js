import Adoption from "../dao/Adoption.js";
import Pet from "../dao/Pets.dao.js";

import AdoptionRepository from "../repository/AdoptionRepository.js";
import PetRepository from "../repository/PetRepository.js";

export const petsService = new PetRepository(new Pet());
export const adoptionsService = new AdoptionRepository(new Adoption());
