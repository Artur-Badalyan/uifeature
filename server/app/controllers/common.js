import sequelize from 'sequelize';
const { Op } = sequelize;

const safeJsonParser = (params) => {
    try {
        let { limit, skip: offset, sort, filter, search } = JSON.parse(params);
        return { limit, offset, sort, filter, search }
    } catch (err) {
        console.log('\n\n\n err = ',err)
        return { limit: null, offset: null, sort: null, filter: null, search: null }
    }
}

export function getListPayload(req) {
    const params = req.query.params;
    console.log('\n\n\n params = ',params)

    let res = { distinct: true };
    res.where = {};
    if (params) {

        let { limit, offset, sort, filter, search } = safeJsonParser(params);
        console.log('\n\n filter',filter)

        if (limit) {
            res.limit = parseInt(limit);
        }
        if (offset) {
            res.offset = parseInt(offset);
        }
        if (sort && sort.field) {
            res.order =  [
                [sort.field, sort.order]
            ]
        }
        if (filter) {
            for (let i in filter) {
                res.where[i] = {[Op.startsWith]: filter[i]};
            }
        }
        if (search) {
            for (let i in search.fields) {
                let obj = {};
                res.where[Op.or] = [];
                obj[search.fields[i]] = {[Op.like]: `%${search.value}%`};
                res.where[Op.or].push(obj);
            }
        }
    }
    return res;
}