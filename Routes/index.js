import express from "express";
import { UsuariosRouter } from "./UsuariosRouter.js";
import { DisciplinasRouter } from "./DisciplinasRouter.js";
import { CursosRouter } from "./CursosRouter.js";
import { SemestresRouter } from "./SemestresRouter.js";

const router = express.Router();

//rota default
router.get('/', (req, res, next) => {
    res.json({
        "statuscode": 200,
        "sucesso": "Rota default - ProjetoIII V3.0"
    });
});
//router.use("/aluno", AlunoRouter);   V 2.0
router.use("/usuarios", UsuariosRouter)
router.use("/disciplinas", DisciplinasRouter)
router.use("/cursos", CursosRouter)
router.use("/semestres", SemestresRouter)

export default router;