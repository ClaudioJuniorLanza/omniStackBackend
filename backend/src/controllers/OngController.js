const connection = require('../database/connections');
const crypto = require('crypto');

module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async update(request, response){
        const { id } = request.params;
        const { name, email, whatsapp, city, uf } = request.body;

        const ongs = await connection('ongs')
        .where('id', id)
        .update({
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ ongs });
    },

    async create(request, response) {
    
        const { name, email, whatsapp, city, uf } = request.body;
   
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }

};