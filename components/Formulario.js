import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {Picker} from '@react-native-community/picker';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
  const {pais, ciudad} = busqueda;
  const [animacionboton] = useState(new Animated.Value(1));

  const consultarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '') {
      mostrarAlerta();
      return;
    }

    guardarConsultar(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agrega una ciudad y pais a la busqueda', [
      {text: 'Entendido'},
    ]);
  };

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: 0.9,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 3,
      tension: 20,
    }).start();
  };

  const estiloAnimacion = () => {
    // eslint-disable-next-line no-labels
    transform: [
      {
        scale: animacionboton,
      },
    ];
  };

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={ciudad}
            style={styles.input}
            onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
            placeholder="Ciudad"
            placeholderTextColor="#666"
          />
        </View>
        <View>
          <Picker
            onValueChange={pais => guardarBusqueda({...busqueda, pais})}
            selectedValue={pais}
            itemStyle={{height: 120, backgroundColor: '#FFF'}}>
            <Picker.Item label="-- Seleccione un pais --" value="" />
            <Picker.Item label="Estados Unidos" value="US" />
            <Picker.Item label="Mexico" value="MX" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="Espana" value="ES" />
            <Picker.Item label="Peru" value="PE" />
            <Picker.Item label="Venezuela" value="VE" />
          </Picker>
        </View>
        <TouchableNativeFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={() => consultarClima()}>
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableNativeFeedback>
      </View>
    </>
  );
};

export default Formulario;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});
