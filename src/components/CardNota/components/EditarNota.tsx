import * as React from 'react';
import { Animated, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { IEditarNota } from '..';
import Texto from '../../Texto';

interface Props {
    setEditarNota: React.Dispatch<React.SetStateAction<IEditarNota>>,
    setNotaAberta: React.Dispatch<React.SetStateAction<boolean>>,
    editarNota: IEditarNota
}

function EditarNota({setEditarNota, setNotaAberta, editarNota} : Props) {

    const opacidade = new Animated.Value(0)
    React.useEffect(() => {
        Animated.timing(opacidade, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }, [])

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
                    numberOfLines={10}
                />
                <TouchableOpacity
                    onPress={() => setNotaAberta(false)}
                >
                    <Texto>Cancelar</Texto>
                </TouchableOpacity>
            </Animated.View>
    );
}

const estilos = StyleSheet.create({
    notaEdicaoContainer: {
        
    },
    inputTitulo: {
        fontSize: 20,
        fontFamily: 'poppinsRegular',
        padding: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    inputDescricao: {
        fontSize: 18,
        fontFamily: 'poppinsRegular',
        marginBottom: 10,
        padding: 10,
        textAlignVertical: 'top',
    }
})

export default EditarNota;