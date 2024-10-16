import express from "express";
import { cursosController } from "../src/Controller/CursosController.js";

const CursosRouter = express.Router();
const CursosController = new cursosController();

//Rotas Usuário (/aluno)
CursosRouter.get('/', CursosController.getAll);
CursosRouter.get('/:id', CursosController.getId);
CursosRouter.post('/', CursosController.cadastro); 
CursosRouter.put('/', CursosController.alterar); 
CursosRouter.delete('/:id', CursosController.deletar); 

export { CursosRouter };