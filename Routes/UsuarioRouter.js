import express from "express";
import { usuarioController } from "../src/Controller/UsuarioController.js";

const UsuarioRouter = express.Router();
const UsuarioController = new usuarioController();

//Rotas Usuário (/aluno)
UsuarioRouter.get('/', UsuarioController.getAll); // Select *
UsuarioRouter.get('/:indice', UsuarioController.getId); //Select * where id =
UsuarioRouter.post('/', UsuarioController.cadastro); // Insert
UsuarioRouter.put('/:indice', UsuarioController.alterar); // Alter
UsuarioRouter.delete('/:indice', UsuarioController.deletar); //Delete

export { UsuarioRouter };