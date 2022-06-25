import * as React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import getRealm from '../../../database/realm';
import Texto from '../../Texto';

interface Props {
    _id: number
    setNotaAberta: React.Dispatch<React.SetStateAction<boolean>>,
    setAvisoAberto: React.Dispatch<React.SetStateAction<boolean>>,
    titulo: string,
    descricao: string
}

function NotaButton({_id, setNotaAberta, setAvisoAberto, titulo, descricao} : Props) {

    const [opacidade] = React.useState(new Animated.Value(0))
    React.useEffect(() => {
        Animated.timing(opacidade, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }, [])

    async function deletarNota () {
        const realm = await getRealm();

        realm.write(() => {
            const nota = realm.objectForPrimaryKey('Nota', _id)
            realm.delete(nota)
        })
    }

    return (  
        <Animated.View style={{opacity: opacidade}}>
            <TouchableOpacity
                style={estilos.notaButtonContainer}
                onPress={() => {
                    setNotaAberta(true)
                }}
                onLongPress={() => setAvisoAberto(true)}
            >
                <Texto style={estilos.notaTitulo}>{titulo}</Texto>
                <Texto style={estilos.notaDescricao}>{descricao}</Texto>
            </TouchableOpacity>
        </Animated.View>
    );
}

const estilos = StyleSheet.create({
    notaButtonContainer: {

    },
    notaTitulo: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    notaDescricao: {
        fontSize: 14
    }
})

export default NotaButton;