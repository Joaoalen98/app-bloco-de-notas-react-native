import Realm from 'realm';

const NotaSchema:Realm.ObjectSchema = {
    name: 'Nota',
    properties: {
        _id: 'int',
        titulo: 'string',
        descricao: 'string'
    },
    primaryKey: '_id'
}

async function getRealm () {
    return await Realm.open({
        schema: [NotaSchema]
    })
}

export default getRealm