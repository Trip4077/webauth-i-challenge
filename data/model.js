const knex = require('knex');
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development);

module.exports = {
    add: user => {
        const [id] = await db('users')
                            .insert(user);

        return findByID(id);
    },

    find: () => {
        return db('users')
                .select('*');
    },

    findBy: filter => {
        return db('users')
                .where(filter);
    },

    findByID: id => {
        return db('users')
                .where({ id })
                .first();
    }
}

