import { prisma } from "../prisma.js";

class chamadaAlunoController {
    async presenca (req, res, next) {
        const { hora_post, ...presencaData } = req.body; // subdivide os dados 2 dois, sendo a hora do post e o restante do req

    try {

        // Verifica se a hora_post está presente e é uma data válida
        if (!hora_post || isNaN(new Date(hora_post))) {
            return res.status(400).json({ message: 'Hora do post inválida.' });
        }

        // Obtém a hora atual do servidor
        const serverTime = new Date();

        // Converte as duas datas para o mesmo fuso horário (UTC)
        const postTime = new Date(hora_post);
        const timeDifference = Math.abs(postTime - serverTime);

        // Verifica se a diferença é maior que 10 segundos
        if (timeDifference > 10000) { // 10 segundos em milissegundos
            return res.status(400).json({
                error: 'Horário do post inválido.',
                serverTime: serverTime.toISOString(),
                postTime: postTime.toISOString(),
            });
        }

        // Remove a hora_post do corpo antes de enviar para o banco de dados
        const createAluno = await prisma.Aluno.create({ data: presencaData }); // Envia apenas os dados relevantes
        res.status(201).json(createAluno);
    } catch (e) {
        res.status(500).json({ message: 'Erro ao fazer presenca: ' + e.message });
    }
    }
}
export { usuarioController };