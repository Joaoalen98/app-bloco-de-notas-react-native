import * as React from 'react';
import { FlatList, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Results } from 'realm';

import CardNota from '../../components/CardNota';
import Texto from '../../components/Texto';
import getRealm from '../../database/realm';
import INotasSchema from '../../interfaces/INotasSchema';

function Home() {

    const [notas, setNotas] = React.useState<INotasSchema[]>([])

    async function getNotas () {
        const realm = await getRealm()

        const notas:Results<INotasSchema> = realm.objects('Nota')
        setNotas([...notas])

        realm.addListener('change', () => {
            setNotas([...notas])
        })
    }

    React.useEffect(() => {
        getNotas();
    }, [])

    return (<>
        <FlatList
            style={estilos.flatListNota}
            ListHeaderComponent={
                <Texto style={estilos.titulo}>
                    {
                        notas.length === 0 ?
                        'Você não possui notas ainda' :
                        'Suas notas:'
                    }
                </Texto>
            }
            data={notas}
            renderItem={({item}) => 
                <CardNota
                    _id={item._id}
                    titulo={item.titulo}
                    descricao={item.descricao}
                />
            }
        />
        <Pressable
            style={estilos.botaoAdicionarNota}
        >
            <Texto style={estilos.botaoLegenda}>
                Adicionar Nota
            </Texto>
        </Pressable>
    </>
    );
}

const estilos = StyleSheet.create({
    flatListNota: {
        paddingHorizontal: 20,
        flex: 1
    },
    titulo: {
        fontSize: 23,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    botaoAdicionarNota: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        backgroundColor: 'darkblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        elevation: 20
    },
    botaoLegenda: {
        color: 'white',
        fontSize: 15
    }
})

export default Home;