import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);

    return(
        <View style = { [styles.container]}>
            {/* Sección izquierda */}
            <View style = { [styles.leftSection, {backgroundColor: '"ffffff'}]}>
                    <Image
                        source={require('../../../../assets/images/logo_parking_go.png')}
                        style = {[styles.logo, {marginTop: 35}]}
                        resizeMode="contain"
                    />

                    <Image
                        source={require('../../../../assets/images/footer_green.png')}
                        style={styles.footerGreen}
                        resizeMode="contain"
                    />
            </View>

            {/* Línea verde divisoria */}
            <View style = { styles.divider } />

            {/* Sección derecha */}
            <View style = { styles.rightSection }>

                <View>
                    <Text>Iniciar Sesión</Text>

                    <TextInput
                        label="Nombre de Usuario"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        style={styles.input}
                        keyboardType="default"
                        left={
                            <TextInput.Icon
                                icon={() => (
                                    <Image
                                        source={require('../../../../assets/icons/lock_open.png')}
                                    />
                                )}
                            />
                        }
                    />
                    <TextInput
                        label="Correo Electrónico"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        style={styles.input}
                        keyboardType="email-address"
                    />
                </View>

                <Image
                    source={require('../../../../assets/images/footer_blue.png')}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leftSection: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    divider: {
        width: 2,
        backgroundColor: '#60c51c',
    },
    logo: {
        width: '40%',
        height: '50%',
    },
    rightSection: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
});