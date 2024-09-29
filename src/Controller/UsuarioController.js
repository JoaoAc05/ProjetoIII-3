import { prisma } from "../prisma.js";

class usuarioController {
    async getAll(req, res, next) { 
        try {
            const usuarios = await prisma.Usuario.findMany()
            res.status(200).json(usuarios);
        } catch (e) {
            res.status(500).json({error: 'Erro ao retornar usuario: ' + e.message});
        }
    }

    async getId(req, res, next) {
        const {
            indice
        } = req.params;
        try {
            const usuario = await prisma.Usuario.findUnique({
                where: {
                    indice: Number(indice),
                },
            })
            res.status(200).json(usuario)
        } catch (e) {
            res.status(500).json({error: 'Erro ao retornar usuario: ' + e.message})
        }
    };

    async cadastro(req, res, next) {
        const { hora_post } = req.body;
    
        try {
            // // Verifica se a hora_post está presente e é uma data válida
            // if (!hora_post || isNaN(new Date(hora_post))) {
            //     return res.status(400).json({ error: 'Hora do post inválida. ' + hora_post });
            // }
    
            // // Obtém a hora atual do servidor
            // const horarioServidor = new Date();
    
            // // Converte as duas datas para o mesmo fuso horário (UTC)
            // const horarioRecebido = new Date(hora_post);
            // const diferencaTempo = Math.abs(horarioRecebido - horarioServidor);
    
            // // Verifica se a diferença é maior que 5 segundos
            // if (diferencaTempo > 5000) { // 5 segundos em milissegundos
            //     return res.status(400).json({
            //         error: 'Horário não aceito.',
            //     //    horarioServidor: horarioServidor.toISOString(),
            //     //    horarioRecebido: horarioRecebido.toISOString(),
            //     });
            // }
    
            // Se a validação passar, cria o aluno
            const createUsuario = await prisma.Usuario.create({ data: req.body });
            res.status(201).json(createUsuario);
        } catch (e) {
            res.status(500).json({ error: 'Erro ao criar usuario: ' + e.message });
        }
    }

    async alterar(req, res, next) {
        const { indice } = req.body;
        const dataToUpdate = req.body;
    
        // Verifica se o body está vazio
        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.' });
        }
    
        try {
            const updateUsuarios = await prisma.Usuario.updateMany({
                where: {
                    indice: Number(indice),
                },
                data: dataToUpdate,  // Passa diretamente o req.body
            });
    
            if (updateUsuarios.count === 0) {
                return res.status(404).json({ error: 'Usuario não encontrado.' });
            }
    
            res.status(201).json({ sucesso: 'Usuario alterado com sucesso.' });
        } catch (e) {
            res.status(500).json({ error: 'Erro ao alterar usuario: ' + e.message });
        }
    }

    async deletar(req, res, next) {
        const { indice } = req.params;
        try { 
            const deleteUsuarios = await prisma.Usuario.deleteMany({
                where: { 
                    indice: Number(indice), 
                },
            })
            res.status(200).json({sucesso: 'Usuario deletado com sucesso.'})
        } catch (e) {
            res.status(500).json({error: 'Erro ao deletar usuario.' + e.message})
        }
    }
}
export { usuarioController };