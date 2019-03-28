const knex = require('knex');
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development);


const add = async user => {
    const [id] = await db('users')
                        .insert(user);

    return findByID(id);
}

const find = () => {
    return db('users')
            .select('*');
}

const findBy = filter => {
    return db('users')
            .where(filter);
}

const findByID = id => {
    return db('users')
            .where({ id })
            .first();
}

module.exports = {
    add,
    find,
    findBy,
    findByID
}

