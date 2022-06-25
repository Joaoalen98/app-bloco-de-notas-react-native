import * as React from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import getRealm from '../../database/realm';

import INotaValores from '../../interfaces/INotaValores';
import Texto from '../Texto';


interface Props {
    modalVisivel: boolean,
    setModalVisivel: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalLancarNota({modalVisivel, setModalVisivel} : Props) {

    const formLimpo:INotaValores = {
        titulo: '',
        descricao: ''     
    }

    const [dadosForm, setDadosFrom] = React.useState<INotaValores>(formLimpo);

    async function criarNota () {
        const realm = await getRealm();

        realm.write(() => {
            const novaNota = {
                ...dadosForm,
                _id: realm.objects('Nota').length
            }

            realm.create('Nota', novaNota)
        })
    }

    return (  
        <Modal
            transparent
            visible={modalVisivel}
            animationType='slide'
        >
            <ScrollView style={estilos.modalContainer}>
                <Texto style={estilos.modalTitulo}>
                    Insira uma nova nota:
                </Texto>
                <TextInput
                    style={estilos.input}
                    placeholder='Titulo da nota'
                    value={dadosForm.titulo}
                    onChangeText={text => setDadosFrom({
                        ...dadosForm,
                        titulo: text
                    })}
                />
                <TextInput
                    style={[estilos.input, {textAlignVertical: 'top'}]}
                    placeholder='Descrição da nota'
                    value={dadosForm.descricao}
                    multiline
                    numberOfLines={5}
                    onChangeText={text => setDadosFrom({
                        ...dadosForm,
                        descricao: text
                    })}
                />
                <TouchableOpacity
                    onPress={() => {
                        setModalVisivel(false)
                        criarNota()
                        setDadosFrom(formLimpo)
                    }}
                >
                    <Texto style={{...estilos.legendaBotao, color: 'darkblue'}}>
                        Salvar
                    </Texto>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setModalVisivel(false)}
                >
                    <Texto style={{...estilos.legendaBotao, color: 'red'}}>
                        Cancelar
                    </Texto>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
}

const estilos = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: Dimensions.get('screen').width,
        backgroundColor: 'white',
        elevation: 10,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    modalTitulo: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    },
    input: {
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'Poppins-Regular'
    },
    legendaBotao: {
        fontSize: 15
    }
})

export default ModalLancarNota;