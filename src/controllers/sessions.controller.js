import { createHash, passwordValidation } from '../utils/index.js';
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import { UserServices } from '../services/user.services.js';

// const usersService = new UserServices();

// const register = async (req, res) => {
//     try {
//         const { first_name, last_name, email, password } = req.body;
//         console.log(req.body);
//         if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
//         // const exists = await usersService.getUserByEmail(email);
//         // if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
//         const hashedPassword = await createHash(password);
//         const user = {
//             first_name,
//             last_name,
//             email,
//             password: hashedPassword
//         }
//         let result = await usersService.create(user);
//         console.log(result);
//         res.send({ status: "success", payload: result._id });
//     } catch (error) {

//     }
// }

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
//     const user = await usersService.getUserByEmail(email);
//     if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"});
//     const isValidPassword = await passwordValidation(user,password);
//     if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"});
//     const userDto = UserDTO.getUserTokenFrom(user);
//     const token = jwt.sign(userDto,'tokenSecretJWT',{expiresIn:"1h"});
//     res.cookie('coderCookie',token,{maxAge:3600000}).send({status:"success",message:"Logged in"})
// }

// const current = async(req,res) =>{
//     const cookie = req.cookies['coderCookie']
//     const user = jwt.verify(cookie,'tokenSecretJWT');
//     if(user)
//         return res.send({status:"success",payload:user})
// }

// const unprotectedLogin  = async(req,res) =>{
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
//     const user = await usersService.getUserByEmail(email);
//     if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"});
//     const isValidPassword = await passwordValidation(user,password);
//     if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"});
//     const token = jwt.sign(user,'tokenSecretJWT',{expiresIn:"1h"});
//     res.cookie('unprotectedCookie',token,{maxAge:3600000}).send({status:"success",message:"Unprotected Logged in"})
// }
// const unprotectedCurrent = async(req,res)=>{
//     const cookie = req.cookies['unprotectedCookie']
//     const user = jwt.verify(cookie,'tokenSecretJWT');
//     if(user)
//         return res.send({status:"success",payload:user})
// }
// export default {
//     current,
//     login,
//     register,
//     current,
//     unprotectedLogin,
//     unprotectedCurrent
// }

export class SessionsController {
  constructor() {
    this.userServices = new UserServices();
  }

  register = async (req, res, next) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!first_name || !last_name || !email || !password)
        return res
          .status(400)
          .send({ status: 'error', error: 'Incomplete values' });
      const exists = await this.userServices.getUserByEmail(email);
      if (exists)
        return res
          .status(400)
          .send({ status: 'error', error: 'User already exists' });
      const hashedPassword = await createHash(password);
      const user = {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      };
      let result = await this.userServices.create(user);
      res.send({ status: 'success', payload: result._id });
    } catch (error) {
      error.path =
        '[POST] api/sessions/register (sessions.controller/register)';

      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .send({ status: 'error', error: 'Incomplete values' });
      const user = await this.userServices.getUserByEmail(email);
      if (!user)
        return res
          .status(404)
          .send({ status: 'error', error: "User doesn't exist" });
      const isValidPassword = await passwordValidation(user, password);
      if (!isValidPassword)
        return res
          .status(400)
          .send({ status: 'error', error: 'Incorrect password' });
      const userDto = UserDTO.getUserTokenFrom(user);
      const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: '1h' });
      res
        .cookie('coderCookie', token, { maxAge: 3600000 })
        .send({ status: 'success', message: 'Logged in' });
    } catch (error) {
      error.path = '[POST] api/sessions/login (sessions.controller/login)';
      next(error);
    }
  };

  current = async (req, res, next) => {
    try {
      const cookie = req.cookies['coderCookie'];
      const user = jwt.verify(cookie, 'tokenSecretJWT');
      if (user) return res.send({ status: 'success', payload: user });
    } catch (error) {
      error.path = '[GET] api/sessions/current (sessions.controller/current)';
      next(error);
    }
  };

  unprotectedLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .send({ status: 'error', error: 'Incomplete values' });
      const user = await this.userServices.getUserByEmail(email);
      if (!user)
        return res
          .status(404)
          .send({ status: 'error', error: "User doesn't exist" });
      const isValidPassword = await passwordValidation(user, password);
      if (!isValidPassword)
        return res
          .status(400)
          .send({ status: 'error', error: 'Incorrect password' });
      const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: '1h' });
      res
        .cookie('unprotectedCookie', token, { maxAge: 3600000 })
        .send({ status: 'success', message: 'Unprotected Logged in' });
    } catch (error) {
      error.path =
        '[GET] api/sessions/unprotectedLogin (sessions.controller/unprotectedLogin)';
      next(error);
    }
  };

  unprotectedCurrent = async (req, res, next) => {
    try {
      const cookie = req.cookies['unprotectedCookie'];
      const user = jwt.verify(cookie, 'tokenSecretJWT');
      if (user) return res.send({ status: 'success', payload: user });
    } catch (error) {
      error.path =
        '[GET] api/sessions/unprotectedCurrent (sessions.controller/unprotectedCurrent)';
      next(error);
    }
  };
}
