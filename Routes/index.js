import express from "express";
import { UsuarioRouter } from "./UsuarioRouter.js";

const router = express.Router();
router.get('/', (req, res, next) => {
    res.json({
        "statuscode": 200,
        "sucesso": "Rota default - ProjetoIII V3.0"
    });
});
router.use("/usuario", UsuarioRouter);

export default router;

//Código criado por  João Alves Cordeiro - Aluno de Análise e Desenvolvimento de Sistemas (ADS) UNIFASIPE.