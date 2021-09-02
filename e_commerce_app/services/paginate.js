module.exports.paginate = async (model, modelOptions, pageSize) => {
    try {
        const limit = 10;
        const page = parseInt(pageSize, 10) || 1;

        modelOptions.offset = getOffset(page, limit);
        modelOptions.limit  = limit

        let { count, rows } = await model.findAndCountAll(modelOptions);
        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            totalPage: parseInt(count / limit) <= 0 ? 1:parseInt(count / limit) + ( parseInt(count % limit) != 0 ? 1:0 ),
            total: count,
            limit: limit,
            data: rows
        }
    } catch (error) {
        error.message = "Pagination error: "+error;
        next(error);
    }
}

const getOffset = (page, limit) => {
 return (page * limit) - limit;
}

const getNextPage = (page, limit, total) => {
    if ((total/limit) > page) {
        return page + 1;
    }

    return null
}

const getPreviousPage = (page) => {
    if (page <= 1) {
        return null
    }
    return page - 1;
}