import express from "express";
import { UsuarioRouter } from "./UsuarioRouter.js";

const router = express.Router();

//rota default
router.get('/', (req, res, next) => {
    res.json({
        "statuscode": 200,
        "sucesso": "Rota default - ProjetoIII V3.0"
    });
});
//router.use("/aluno", AlunoRouter);   V 2.0
router.use("/usuario", UsuarioRouter)

export default router;