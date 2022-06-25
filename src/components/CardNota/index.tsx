import * as React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

import INotaValores from '../../interfaces/INotaValores';
import AvisoApagarNota from './components/AvisoApagarNota';
import EditarNota from './components/EditarNota';
import NotaButton from './components/NotaButton';

interface Props {
    _id: number,
    titulo: string,
    descricao: string
}

function CardNota({_id, titulo, descricao} : Props) {

    const slideNotaValorInicial = Dimensions.get('screen').width;
    const [animacaoSlideNota] = React.useState(new Animated.Value(slideNotaValorInicial));
    React.useEffect(() => {
        Animated.timing(animacaoSlideNota, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start()
    }, [])

    const [notaAberta, setNotaAberta] = React.useState<boolean>(false)
    const [avisoAberto, setAvisoAberto] = React.useState<boolean>(false)

    return (  
        <Animated.View 
            style={[
                estilos.animatedContainer, 
                {marginLeft: animacaoSlideNota}
            ]}>
            {
                notaAberta ? 
                <EditarNota
                    _id={_id}
                    titulo={titulo}
                    descricao={descricao}
                    setNotaAberta={setNotaAberta}
                    key={1}
                />
                :
                <NotaButton
                    setAvisoAberto={setAvisoAberto}
                    _id={_id}
                    titulo={titulo}
                    descricao={descricao}
                    setNotaAberta={setNotaAberta}
                    key={2}
                />
            }
            <AvisoApagarNota 
                _id={_id}
                avisoAberto={avisoAberto}
                setAvisoAberto={setAvisoAberto}
            />
        </Animated.View>
    );
}

const estilos = StyleSheet.create({
    animatedContainer: {
        minWidth: 200,
        padding: 20,
        borderRadius: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10
    }
})

export default CardNota;