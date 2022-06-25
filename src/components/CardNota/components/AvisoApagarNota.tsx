import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import getRealm from '../../../database/realm';
import INotasSchema from '../../../interfaces/INotasSchema';
import Texto from '../../Texto';


interface Props {
    _id: number,
    avisoAberto: boolean,
    setAvisoAberto: React.Dispatch<React.SetStateAction<boolean>>
}

function AvisoApagarNota({_id, avisoAberto, setAvisoAberto} : Props) {


    async function deletarNota () {
        const realm = await getRealm()

        const nota:Realm.Object & INotasSchema = realm.objectForPrimaryKey('Nota', _id)
        realm.write(() => {
            realm.delete(nota);
        })
    }

    return (  
        <View 
            style={{
                ...estilos.container, 
                display: avisoAberto? 'flex' : 'none'
            }}    
        >
            <Texto style={estilos.titulo}>
                Você tem certeza que quer apagar a nota?
            </Texto>
            <View style={estilos.botoesContainer}>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => deletarNota()}
                >
                    <Texto 
                        style={{...estilos.legendaBotao, color: 'darkblue'}}
                    >
                        Sim
                    </Texto>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => setAvisoAberto(false)}
                >
                    <Texto 
                        style={{...estilos.legendaBotao, color: 'red'}}
                    >
                        Não
                    </Texto>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        marginTop: 20
    },
    titulo: {
        textAlign: 'center',
        fontSize: 15
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    botao: {
        padding: 10
    },
    legendaBotao: {
        fontSize: 15
    }
})

export default AvisoApagarNota;