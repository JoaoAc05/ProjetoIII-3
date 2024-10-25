import { prisma } from "../prisma.js";

class chamadaAlunosController {
    async getAll(req, res) { 
        try {
            const chamadasAlunos = await prisma.chamadaAlunos.findMany()
            if (!chamadasAlunos) {
                return res.status(404).json({message: 'Nenhum registro encontrado'})
            }

            res.status(200).json(chamadasAlunos);
        } catch (e) {
            res.status(500).json({message: 'Erro ao retornar presenças das chamadas: ' + e.message});
        }
    }

    async getId(req, res) {
        const { id_chamada } = req.params;
        try {
            const chamadaAlunos = await prisma.chamadaAlunos.findMany({
                where: {
                    id_chamada: Number(id_chamada),
                },
            })
            if (!chamadaAlunos) {
                return res.status(404).json({message: 'Não encontrado nenhum registro para esta chamada'})
            }

            res.status(200).json(chamadaAlunos)
        } catch (e) {
            res.status(500).json({message: 'Erro ao retornar presenças da chamada: ' + e.message})
        }
    };

    async presenca (req, res, next) {
        const { hora_post, id_chamada, id_aluno } = req.body;
        try {

            // Verifica se a hora_post está presente e é uma data válida
            if (!hora_post || isNaN(new Date(hora_post))) {
                return res.status(400).json({ message: 'Hora do post inválida.' });
            }

            // Obtém a hora atual do servidor (VERCEL É FUSO WHASHINGTON)
            const serverTime = new Date();

            // Converte as duas datas para o mesmo fuso horário (UTC)
            const postTime = new Date(hora_post);
            const timeDifference = Math.abs(postTime - serverTime);

            // Verifica se a diferença é maior que 5 segundos
            if (timeDifference > 5000) {
                return res.status(400).json({
                    message: 'Horário do aluno é inválido.',
                    serverTime: serverTime.toISOString(),
                    postTime: postTime.toISOString(),
                });
            }

            if (!id_aluno || !id_chamada) {
                return res.status(400).json({ message: 'Os campos id_aluno e id_chamada são obrigatórios.' });
            }

            const aluno = await prisma.usuario.findUnique({
                where: {
                    id: id_aluno
                }
            })
            if (!aluno) {
                return res.status(404).json({message: 'Aluno não encontrado.'});
            }
            if(aluno.tipo !== 0) {
                return res.status(401).json({message: 'Usuário não é um aluno.'});
            }

            const chamada = await prisma.chamada.findUnique({
                where: {
                    id: id_chamada
                }
            })
            if (!chamada) {
                return res.status(404).json({message: 'Chamada não encontrada.'})
            }

            const createChamadaAluno = await prisma.chamadaAlunos.create({ 
                data: {
                   Chamada: {
                        connect: {id: id_chamada}
                    } ,
                    Aluno: {
                        connect: {id: id_aluno}
                    }, 
                }
             }); 
            res.status(201).json(createChamadaAluno);
        } catch (e) {
            res.status(500).json({ message: 'Erro ao fazer presenca: ' + e.message });
        }
    }

    async alterar(req, res, next) {
        const { id, id_chamada, id_aluno } = req.body;

        // Verifica se o body está vazio
        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ message: 'Nenhum dado fornecido para atualização.' });
        }

        // Se tiver id_chamada, verificar se a chamada existe
        if(id_chamada) {
            const chamada = await prisma.chamada.findUnique({
                where:{
                    id: id_chamada
                }
            })
            if (!chamada) {
                return res.status(404).json({message: 'Chamada não encontrada'})
            }
        }

        // Se tiver id_aluno, verificar se o usuario existe e é um aluno
        if (id_aluno) {
            const aluno = await prisma.usuario.findUnique({
                where: {
                    id: id_aluno
                }
            })
            if (!aluno) {
                return res.status(404).json({message: 'Aluno não encontrado'})
            }
            if (aluno.tipo !== 0) {
                return res.status(401).json({message: 'Usuário não é um aluno.'})
            }
        }
    
        try {
            const updateChamadaAlunos = await prisma.chamadaAlunos.updateMany({
                where: {
                    id: Number(id),
                },
                data: dataToUpdate,  // Passa diretamente o req.body
            });
    
            if (updateChamadaAlunos.count === 0) {
                return res.status(404).json({ message: 'Registro de chamada não encontrado.' });
            }
    
            res.status(200).json({ message: 'Curso alterado com sucesso.' });
        } catch (e) {
            res.status(500).json({ message: 'Erro ao alterar curso: ' + e.message });
        }
    }
    
    async deletar(req, res) {
        const { id_aluno } = req.params;
        try {
            const deleteChamadaAluno = await prisma.chamadaAlunos.deleteMany({
                where: { 
                    id_aluno: Number(id_aluno), 
                },
            })
            if (deleteChamadaAluno.count === 0) {
                return res.status(404).json({ message: 'Registro de presença não encontrado.' });
            }
            res.status(200).json({message: 'Presença do aluno deletada com sucesso.'})
        } catch (e) {
            res.status(500).json({message: 'Erro ao deletar presença.' + e.message})
        }
    }
}
export { chamadaAlunosController };