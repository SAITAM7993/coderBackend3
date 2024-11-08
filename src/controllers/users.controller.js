// import { customError } from '../errors/custom.error.js';
// import { generateUsersMock } from '../mocks/user.mock.js';
import UserDTO from '../dto/uSER.dto.js';
import { createHash } from '../utils/index.js';
import { UserServices } from '../services/user.services.js';

export class UserControllers {
  constructor() {
    this.userServices = new UserServices();
  }

  // createUserMock = async (req, res, next) => {
  //   try {
  //     const users = await this.userServices.createMocks();
  //     res.status(201).json({ status: 'ok', users });
  //   } catch (error) {
  //     error.path = 'users.controller/createUserMock';
  //     next(error);
  //   }
  // }; esta funcionalidad esta en mocks

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userServices.getAll();
      res.send({ status: 'success', payload: users });
    } catch (error) {
      error.path = '[GET] api/users/ (users.controller/getAllUsers)';

      next(error);
    }
  };

  createUser = async (req, res, next) => {
    const userBody = req.body;
    try {
      const { first_name, last_name, email, password, role } = req.body;
      if (!first_name || !last_name || !email || !password || !role)
        return res
          .status(400)
          .send({ status: 'error', error: 'Incomplete values' });
      var user = { ...userBody, password: await createHash(password) };
      const result = await this.userServices.create(user);
      res.status(201).json({ status: 'success', payload: result }); //el 201 es creado correctamente
    } catch (error) {
      error.path = '[POST] api/users/ (users.controller/createUser)';
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const userId = req.params.uid;
      const user = await this.userServices.getById(userId);

      res.send({ status: 'success', payload: user });
    } catch (error) {
      error.path = '[POST] api/users/:uid (users.controller/getUser)';
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const updateBody = req.body;
      const userId = req.params.uid;
      const user = await this.userServices.getById(userId);
      if (!user)
        return res
          .status(404)
          .send({ status: 'error', error: 'User not found' });

      const result = await this.userServices.update(userId, updateBody);
      res.send({ status: 'success', payload: result });
    } catch (error) {
      error.path = '[PUT] api/users/:uid (users.controller/updateUser) ';
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.uid;
      const result = await this.userServices.remove(userId);
      res.send({ status: 'success', message: 'User deleted' });
    } catch (error) {
      error.path =
        '[DELETE] api/users/:uid (users.controller/updatdeleteUserUser)';
      next(error);
    }
  };
}
