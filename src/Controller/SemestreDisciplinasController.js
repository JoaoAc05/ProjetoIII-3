import { prisma } from "../prisma.js";

// Tabela referente ao vinculo de matérias que o professor irá reger no semestre do ano (/1 ou /2)

class semestreDisciplinasController {
    async getAll(req, res) { 
        try {
            const semestreDisciplinas = await prisma.semestreProfessorDisciplinas.findMany()
            res.status(200).json(semestreDisciplinas);
        } catch (e) {
            res.status(500).json({message: 'Erro ao retornar semestreDisciplinas: ' + e.message});
        }
    }

    //Get de acordo com o ID do semestre do ano
    async getId(req, res) {
        const {
            id
        } = req.params;
        try {
            const semestreDisciplinas = await prisma.semestreProfessorDisciplinas.findUnique({
                where: {
                    id_semestre: Number(id),
                },
            })
            res.status(200).json(semestreDisciplinas)
        } catch (e) {
            res.status(500).json({message: 'Erro ao retornar disciplinas do professor: ' + e.message})
        }
    };



    async cadastro(req, res) {
        try {
            const createSemestreDisciplinas = await prisma.semestreProfessorDisciplinas.create({ data: req.body });
            res.status(201).json(createSemestreDisciplinas);
        } catch (e) {
            res.status(500).json({ message: 'Erro ao criar semestreDisciplinas: ' + e.message });
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
            const updateSemestreDisciplinas = await prisma.semestreProfessorDisciplinas.updateMany({
                where: {
                    id: Number(id),
                },
                data: dataToUpdate,  // Passa diretamente o req.body
            });
    
            if (updateSemestreDisciplinas.count === 0) {
                return res.status(404).json({ message: 'Semestre não encontrado.' });
            }
    
            res.status(200).json({ message: 'Semestre alterado com sucesso.' });
        } catch (e) {
            res.status(500).json({ message: 'Erro ao alterar semestreDisciplinas: ' + e.message });
        }
    }

    async deletar(req, res) {
        const { id } = req.params;
        try {
            const deleteSemestreDisciplinas = await prisma.semestreProfessorDisciplinas.deleteMany({
                where: { 
                    id: Number(id), 
                },
            })
            res.status(200).json({sucesso: 'Semestre deletado com sucesso.'})
        } catch (e) {
            res.status(500).json({error: 'Erro ao deletar semestreDisciplinas:' + e.message})
        }
    }
}
export { semestreDisciplinasController };
