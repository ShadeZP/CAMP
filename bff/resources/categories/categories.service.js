const categoriesRepo = require('./categories.repository');

function flattenData (data, parent=null, ancestors=[]) {

    let newItem = {
        id: data.id,
        name: data.name,
        description: data.name,
        slug: data.id.toString(),
        parent: parent ? {id: parent.id} : null,
        ancestors: ancestors
    };

    let result = [newItem];

    if (data.children_data) {
        let newAncestors = ancestors.concat([{type:'category', id: data.id}]);
        for (let child of data.children_data) {
            result = result.concat(flattenData(child, newItem, newAncestors));
        }
    }

    return result;
}


const getCategories = async () => {
    const res = await categoriesRepo.getCategories();

    let newData = flattenData(res);

    return newData;
}

module.exports = {getCategories};

