import express from "express";
import { chamadaAlunosController } from "../src/Controller/ChamadaAlunosController.js";

const ChamadaAlunosRouter = express.Router();
const ChamadaAlunosController = new chamadaAlunosController();

ChamadaAlunosRouter.get('/alunos', ChamadaAlunosController.getAll);
ChamadaAlunosRouter.get('/:id/alunos', ChamadaAlunosController.getId); // Get pelo ID da chamada
ChamadaAlunosRouter.post('/alunos', ChamadaAlunosController.presenca); 
ChamadaAlunosRouter.put('/alunos', ChamadaAlunosController.alterar); 
ChamadaAlunosRouter.delete('/alunos/:id', ChamadaAlunosController.deletar); // Delete pelo ID do aluno

export { chamadaAlunosController };