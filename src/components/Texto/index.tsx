import * as React from 'react';
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface Props {
    children: string,
    style?: TextStyle & ViewStyle
}

function Texto({children, style} : Props) {

    const estilos = estilosFuncao(style);

    return (  
        <Text style={[style, estilos.texto]}>
            {children}
        </Text>
    );
}

const estilosFuncao = (style?: TextStyle) => StyleSheet.create({
    texto: {
        fontFamily: style?.fontWeight === 'bold' ?
            'Poppins-SemiBold' : 'Poppins-Regular',
        fontWeight: 'normal'
    }
})

export default Texto;