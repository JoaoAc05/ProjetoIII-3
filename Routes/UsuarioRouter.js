import express from "express";
import { usuarioController } from "../src/Controller/UsuarioController.js";

const UsuarioRouter = express.Router();
const UsuarioController = new usuarioController();

//Rotas Usuário (/Usuario)
UsuarioRouter.get('/', UsuarioController.getAll); // Select *
UsuarioRouter.get('/:id', UsuarioController.getId); //Select * where id =
UsuarioRouter.post('/', UsuarioController.cadastro); // Insert
UsuarioRouter.put('/', UsuarioController.alterar); // Alter
UsuarioRouter.delete('/:id', UsuarioController.deletar); //Delete
UsuarioRouter.post('/login', UsuarioController.loginAluno);

export { UsuarioRouter };