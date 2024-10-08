import express from "express";
import { AlunoRouter } from "./AlunoRouter.js";

const router = express.Router();

//rota default
router.get('/', (req, res, next) => {
    res.json({
        "statuscode": 200,
        "sucesso": "Rota default - ProjetoIII V3.0"
    });
});
router.use("/aluno", AlunoRouter);

export default router;