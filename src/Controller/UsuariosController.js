import { prisma } from "../prisma.js";

class usuariosController {
    async getAll(req, res, next) { 
        try {
            const usuarios = await prisma.usuario.findMany()
            res.status(200).json(usuarios);
        } catch (e) {
            res.status(500).json({message: 'Erro ao retornar usuario: ' + e.message});
        }
    }

    async getId(req, res, next) {
        const {
            indice
        } = req.params;
        try {
            const usuario = await prisma.usuario.findUnique({
                where: {
                    indice: Number(indice),
                },
            })
            res.status(200).json(usuario)
        } catch (e) {
            res.status(500).json({message: 'Erro ao retornar usuario: ' + e.message})
        }
    };

    async cadastro(req, res, next) {
        try {
            const createUsuario = await prisma.usuario.create({ data: req.body });
            res.status(201).json(createUsuario);
        } catch (e) {
            res.status(500).json({ message: 'Erro ao criar usuario: ' + e.message });
        }
    }

    async alterar(req, res, next) {
        const { indice } = req.body;
        const dataToUpdate = req.body;
    
        // Verifica se o body está vazio
        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ message: 'Nenhum dado fornecido para atualização.' });
        }
    
        try {
            const updateUsuarios = await prisma.usuario.updateMany({
                where: {
                    indice: Number(indice),
                },
                data: dataToUpdate,  // Passa diretamente o req.body
            });
    
            if (updateUsuarios.count === 0) {
                return res.status(404).json({ message: 'Usuario não encontrado.' });
            }
    
            res.status(200).json({ message: 'Usuario alterado com sucesso.' });
        } catch (e) {
            res.status(500).json({ message: 'Erro ao alterar usuario: ' + e.message });
        }
    }

    async deletar(req, res, next) {
        const { indice } = req.params;
        try {
            const deleteUsuarios = await prisma.usuario.deleteMany({
                where: { 
                    indice: Number(indice), 
                },
            })
            res.status(200).json({message: 'Usuario deletado com sucesso.'})
        } catch (e) {
            res.status(500).json({message: 'Erro ao deletar usuario.' + e.message})
        }
    }

    async loginAluno (req, res, next) {
        const { imei } = req.body;
        const { email, senha } = req.body;

        try {
            // Verifica se os campos estão preenchidos
            if (!email || !senha) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
            }

            // Consulta o banco de dados para verificar se o email existe
            const usuario = await prisma.Usuario.findUnique({
            where: { email: email }
            });
            // Se o email não for encontrado, retorna um erro
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            //Compara a senha da req com a senha do banco de dados
            const validaSenha = await compare(senha, usuario.senha);

            if (!validaSenha) {
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            if(!usuario.imei) {
                //não possui imei no banco
                const updateImei = await prisma.usuario.updateMany({
                where: {
                    email: email,
                    senha: senha,
                },
                data: imei,  // Passa diretamente o req.body
                });

                if (updateImei.count === 0) {
                return res.status(404).json({ message: 'Usuario não encontrado para inserir IMEI.' });
                }

                return res.status(201).json({ message: 'Login bem-sucedido' });

            } else if (imei == usuario.imei) {
                return res.status(200).json({ message: 'Login bem-sucedido - IMEI já cadastrado' });   
            } else {
                return res.status(400).json({ message: "IMEI diferente do usuario ou inválido."})
            }
 
        } catch (e) {
            return res.status(500).json({ message: 'Erro interno no servidor' + e.message});
        }

    }

}
export { usuariosController };