import express from "express";
import { semestreDisciplinasController } from "../src/Controller/SemestreDisciplinasController.js";

const SemestreDisciplinasRouter = express.Router();
const SemestreDisciplinasController = new semestreDisciplinasController();

//Rotas Usuário (/Usuario)
SemestreDisciplinasRouter.get('/', SemestreDisciplinasController.getAll); 
SemestreDisciplinasRouter.get('/:id', SemestreDisciplinasController.getId); 
SemestreDisciplinasRouter.post('/', SemestreDisciplinasController.cadastro); 
SemestreDisciplinasRouter.put('/', SemestreDisciplinasController.alterar); 
SemestreDisciplinasRouter.delete('/:id', SemestreDisciplinasController.deletar);

export { SemestreDisciplinasRouter };