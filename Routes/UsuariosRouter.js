import express from "express";
import { usuariosController } from "../src/Controller/UsuariosController.js";

const UsuariosRouter = express.Router();
const UsuariosController = new usuarioController();

//Rotas Usuário (/Usuario)
UsuariosRouter.get('/', UsuariosController.getAll); // Select *
UsuariosRouter.get('/:id', UsuariosController.getId); //Select * where id =
UsuariosRouter.post('/', UsuariosController.cadastro); // Insert
UsuariosRouter.put('/', UsuariosController.alterar); // Alter
UsuariosRouter.delete('/:id', UsuariosController.deletar); //Delete
UsuariosRouter.post('/login', UsuariosController.loginAluno);

export { UsuariosRouter };