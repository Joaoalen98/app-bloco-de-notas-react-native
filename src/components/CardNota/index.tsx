import * as React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import EditarNota from './components/EditarNota';
import NotaButton from './components/NotaButton';

interface Props {
    id: number,
    titulo: string,
    descricao: string
}

export interface IEditarNota {
    titulo: string,
    descricao: string
}

function CardNota({id, titulo, descricao} : Props) {

    const [editarNota, setEditarNota] = React.useState<IEditarNota>({
        titulo: titulo,
        descricao: descricao
    });

    const slideNotaValorInicial = Dimensions.get('screen').width;
    const slideNotaValorFinal = 0
    const animacaoSlideNota = new Animated.Value(slideNotaValorInicial);
    React.useEffect(() => {
        Animated.timing(animacaoSlideNota, {
            toValue: slideNotaValorFinal,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }, [])

    const [notaAberta, setNotaAberta] = React.useState<boolean>(false)

    return (  
        <Animated.View style={[estilos.animatedContainer, {marginLeft: animacaoSlideNota}]}>
            {
                notaAberta ? 
                <EditarNota
                    editarNota={editarNota}
                    setEditarNota={setEditarNota}
                    setNotaAberta={setNotaAberta}
                    key={1}
                />
                :
                <NotaButton
                    titulo={titulo}
                    descricao={descricao}
                    setNotaAberta={setNotaAberta}
                    key={2}
                />
            }
        </Animated.View>
    );
}

const estilos = StyleSheet.create({
    animatedContainer: {
        minWidth: 200,
        padding: 20,
        borderRadius: 15,
        borderColor: '#ccc',
        borderWidth: 1
    }
})

export default CardNota;