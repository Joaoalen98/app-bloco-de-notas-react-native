import * as React from 'react';
import { Animated, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import getRealm from '../../../database/realm';
import INotaValores from '../../../interfaces/INotaValores';
import Texto from '../../Texto';

interface Props {
    _id: number,
    setNotaAberta: React.Dispatch<React.SetStateAction<boolean>>,
    titulo: string,
    descricao: string
}

function EditarNota({_id, setNotaAberta, titulo, descricao } : Props) {

    const [editarNota, setEditarNota] = React.useState<INotaValores>({
        titulo: titulo,
        descricao: descricao
    });

    const [opacidade] = React.useState(new Animated.Value(0))
    React.useEffect(() => {
        Animated.timing(opacidade, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }, [])

    async function edicaoNota () {
        const realm = await getRealm()

        const nota:Realm.Object & INotaValores = realm.objectForPrimaryKey('Nota', _id)
        realm.write(() => {
            nota.titulo = editarNota.titulo,
            nota.descricao = editarNota.descricao
        })
    }
    return (  
        <Animated.View style={[estilos.notaEdicaoContainer, {opacity: opacidade}]}>
                <TextInput
                    style={estilos.inputTitulo}
                    placeholder='Titulo'
                    value={editarNota.titulo}
                    onChangeText={text => setEditarNota({
                        ...editarNota,
                        titulo: text
                    })}
                />
                <TextInput
                    style={estilos.inputDescricao}
                    placeholder='Descrição'
                    value={editarNota.descricao}
                    onChangeText={text => setEditarNota({
                        ...editarNota,
                        descricao: text
                    })}
                    multiline
                    numberOfLines={5}
                />
                <TouchableOpacity
                    onPress={() => {
                        setNotaAberta(false)
                        edicaoNota()
                    }}
                >
                    <Texto style={{...estilos.legendaBotao, color: 'darkblue'}}>
                        Salvar
                    </Texto>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setNotaAberta(false)}
                >
                    <Texto style={{...estilos.legendaBotao, color: 'red'}}>
                        Cancelar
                    </Texto>
                </TouchableOpacity>
            </Animated.View>
    );
}

const estilos = StyleSheet.create({
    notaEdicaoContainer: {
        
    },
    inputTitulo: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        padding: 10,
        marginBottom: 10,
    },
    inputDescricao: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        marginBottom: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
    legendaBotao: {
        fontSize: 15
    }
})

export default EditarNota;