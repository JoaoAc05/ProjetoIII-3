import express from "express";
import { semestreDisciplinasController } from "../src/Controller/SemestreDisciplinasController.js";

const SemestreDisciplinasRouter = express.Router();
const SemestreDisciplinasController = new semestreDisciplinasController();

SemestreDisciplinasRouter.get('/', SemestreDisciplinasController.getAll); 
SemestreDisciplinasRouter.get('/:id_semestre', SemestreDisciplinasController.getId); // ID DO SEMESTRE DO ANO
SemestreDisciplinasRouter.post('/', SemestreDisciplinasController.cadastro); 
SemestreDisciplinasRouter.put('/', SemestreDisciplinasController.alterar); 
SemestreDisciplinasRouter.delete('/:id', SemestreDisciplinasController.deletar); // ID PROPRIO

export { SemestreDisciplinasRouter };