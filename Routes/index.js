import express from "express";
import { UsuariosRouter } from "./UsuariosRouter.js";

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

export default router;