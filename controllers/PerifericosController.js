const knex = require('../database/dbConfig');

module.exports = {
    //Simple listing
    async perifericosGeral(req, res) {
        const perifericos = await knex('perifericos')
        res.status(200).json(perifericos);
    },

    //Elaborated Listing
    async list(req, res) {
        const perifericos = await knex
            .select("p.id", "p.foto", "p.descricao", "p.preco", "p.empresa")
            .from("perifericos as p")
            .leftJoin("marca as m", "p.marca_id", "m.id")
            .orderBy("p.id", "desc");
        try {
            res.status(200).json(perifericos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    //Add Peripheral to the bank
    async addPeriferico(req, res) {
        const { empresa, foto, descricao, preco, marca_id } = req.body;

        if (!empresa || !foto || !descricao || !preco || !marca_id) {
            res.status(400).json({ erro: "Enviar todos os dados." })
            return;
        } else {
            if (marca_id > 4 || marca_id < 0) {
                res.status(400).json({ erro: "ID incorreto." })
                return;
            }
            try {
                const newPeriferico = await knex("perifericos").insert({ empresa, foto, descricao, preco, marca_id });
                res.status(201).json({ id: newPeriferico[0] })
            } catch (error) {
                res.status(400).json({ erro: error.message });
            }
        }

    },

    //Best Something Peripheral
    async bestPeriferico(req, res){
        const id = req.params["id"];
        try{
            const dados = await knex('perifericos').where({id})
            if(dados.length == 0){
                res.status(400).json({msg: "ID invalido."})
                return;
            }
            if(dados[0].destaque == 1){
                await knex('perifericos').where({id}).update({'destaque': 0})
                res.status(200).json({msg: "Removido dos destaques"})
            }else{
                await knex('perifericos').where({id}).update({'destaque': 1})
                res.status(200).json({msg: "Adicionados dos destaques"})
            }
        }catch(error){
            res.status(400).json({erro: error.message});
        }
    },

    //STARSOMETHING :O :O :O
    async destaques(req, res){
        try{
            const lista = await knex('perifericos').where({'destaque': 1}).orderBy('id', 'desc')
            if(lista.length == 0){
                res.status(200).json({msg: "Nenhum destaque na lista."})
                return;
            }
            res.status(200).json(lista);
        }catch(error){
            res.status(400).json({erro: error.message});
        }
    },

    //Update Peripheral
    async updatePeriferico(req, res) {
        const id = req.params["id"];
        const { preco } = req.body;
        const Ids = await knex("perifericos").where({ id })

        if (Ids.length == 0) {
            res.status(400).json({ erro: "Objeto não cadastrado." })
            return;
        } else {
            if (!preco) {
                res.status(400).json({ erro: "Enviar Dados" })
                return;
            } else {
                try {
                    await knex("perifericos").where({ id }).update({ preco })
                    res.status(201).json({ msg: "Dados alterados." })
                } catch {
                    res.status(400).json({ erro: error.message });
                }
            }
        }
    },

    //Delete Peripheral
    async deletePeriferico(req, res) {
        const id = req.params["id"];
        const Ids = await knex("perifericos").where({ id })
        if (Ids.length == 0) {
            res.status(200).json({ erro: "Objeto não cadastrado" })
            return;
        }
        try {
            await knex("perifericos").where({ id }).delete()
            res.status(201).json({ msg: "Object Delleted Sucessfully." })
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    //Search By Something
    async searchPeriferico(req, res){
        const search = req.params["search"];
        try{
            const dados = await knex('perifericos')
            .select("p.id", "p.foto", "p.descricao", "p.preco", "p.empresa")
            .from("perifericos as p")
            .leftJoin("marca as m", "p.marca_id", "m.id")
            .orderBy("p.id", "desc")
            .where('descricao', 'like', `%${search}%`)
            .orWhere('preco', 'like', `%${search}%`)
            .orWhere('empresa', 'like', `%${search}%`)
            .orderBy('id', 'desc');
            res.status(200).json(dados);
        }catch(error) {
            res.status(400).json({erro: error.message})
        }
    }
}