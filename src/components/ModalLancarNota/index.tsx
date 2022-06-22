import * as React from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import INotaValores from '../../interfaces/INotaValores';
import Texto from '../Texto';


interface Props {
    modalVisivel: boolean,
    setModalVisivel: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalLancarNota({modalVisivel, setModalVisivel} : Props) {

    const [dadosForm, setDadosFrom] = React.useState<INotaValores>({
        titulo: '',
        descricao: ''
    })

    return (  
        <Modal>
            <ScrollView>
                <TextInput
                    style={estilos.input}
                    value={dadosForm.titulo}
                    onChangeText={text => setDadosFrom({
                        ...dadosForm,
                        titulo: text
                    })}
                />
                <TextInput
                    style={estilos.input}
                    value={dadosForm.descricao}
                    onChangeText={text => setDadosFrom({
                        ...dadosForm,
                        descricao: text
                    })}
                />
                <TouchableOpacity>
                    <Texto>
                        Salvar
                    </Texto>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Texto>
                        Cancelar
                    </Texto>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
}

const estilos = StyleSheet.create({

})

export default ModalLancarNota;