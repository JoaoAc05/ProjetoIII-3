import { prisma } from "../prisma.js";

class turmasController {
    async getAll(req, res) { 
        try {
            const turmas = await prisma.turma.findMany()
            res.status(200).json(turmas);
        } catch (e) {
            res.status(500).json({message: 'Erro ao retornar turmas: ' + e.message});
        }
    }

    async getId(req, res) {
        const {
            id
        } = req.params;
        try {
            const turma = await prisma.turma.findUnique({
                where: {
                    id: Number(id),
                },
            })
            res.status(200).json(turma)
        } catch (e) {
            res.status(500).json({message: 'Erro ao retornar turma: ' + e.message})
        }
    };

    async cadastro(req, res) {
        try {
            const createTurmas = await prisma.turma.create({ data: req.body });
            res.status(201).json(createTurmas);
        } catch (e) {
            res.status(500).json({ message: 'Erro ao criar turma: ' + e.message });
        }
    }

    async alterar(req, res) {
        const { id } = req.body;
        const dataToUpdate = req.body;
    
        // Verifica se o body está vazio
        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.' });
        }
    
        try {
            const updateTurmas = await prisma.turma.updateMany({
                where: {
                    id: Number(id),
                },
                data: dataToUpdate,  // Passa diretamente o req.body
            });
    
            if (updateTurmas.count === 0) {
                return res.status(404).json({ message: 'Turma não encontrado.' });
            }
    
            res.status(200).json({ message: 'Turma alterado com sucesso.' });
        } catch (e) {
            res.status(500).json({ message: 'Erro ao alterar turma: ' + e.message });
        }
    }

    async deletar(req, res) {
        const { id } = req.params;
        try {
            const deleteTurmas = await prisma.turma.deleteMany({
                where: { 
                    id: Number(id), 
                },
            })
            res.status(200).json({sucesso: 'Semestre deletado com sucesso.'})
        } catch (e) {
            res.status(500).json({error: 'Erro ao deletar turma.' + e.message})
        }
    }
}
export { turmasController };