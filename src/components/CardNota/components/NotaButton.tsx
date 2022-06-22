import * as React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import Texto from '../../Texto';

interface Props {
    setNotaAberta: React.Dispatch<React.SetStateAction<boolean>>,
    titulo: string,
    descricao: string
}

function NotaButton({ setNotaAberta, titulo, descricao} : Props) {

    const opacidade = new Animated.Value(0)
    React.useEffect(() => {
        Animated.timing(opacidade, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }, [])

    return (  
        <Animated.View style={{opacity: opacidade}}>
            <TouchableOpacity
                style={estilos.notaButtonContainer}
                onPress={() => {
                    setNotaAberta(true)
                }}
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