import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LoadingAnimation from '../Loading'; // Assurez-vous d'importer le composant correctement

function MyComponent() {
    const WHIRLPOOL_LOGO = require('../../../assets/WHIRLPOOL_LOGO.png');
    const top = require('../../../assets/top.png');
    const Garde = require('../../../assets/garde.png');
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false);

    const handlePress = () => {
        setLoading(true);

        // Simuler un appel API ou toute opération asynchrone
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Login');
        }, 2000); // délai de 2 secondes
    };

    return (
        <View style={styles.view1}>
            {loading ? (
                <LoadingAnimation source={WHIRLPOOL_LOGO} />
            ) : (
                <>
                    <Image
                        resizeMode="contain"
                        source={Garde}
                        style={styles.image1}
                    />
                    <Image
                        resizeMode="contain"
                        source={WHIRLPOOL_LOGO}
                        style={styles.image2}
                    />
                    <View style={styles.view2}>
                        <Text style={styles.text}>
                        Whirlpool, le sens de l'essentiel
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
                        <Text style={styles.loginButtonText}>Get start</Text>
                    </TouchableOpacity>
                    <View style={styles.view4}>
                        <Image
                            resizeMode="contain"
                            source={top}
                            style={styles.image3}
                        />
                        <View style={styles.view5}>
                            <Text style={styles.versionText}>Version 1.0.4 Developed by Aziz & Salah</Text>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        backgroundColor: "#FFF",
        display: "flex",
        maxWidth: 500,
        flexDirection: "column",
        alignItems: "center",
        color: "#C6C6C6",
        fontWeight: "700",
        textAlign: "center",
        padding: 16,
        justifyContent: "center",
        height: '100%'
    },
    loader: {
        marginTop: 20,
    },
    image1: {
        width: "100%",
        height: undefined,
        aspectRatio: 1.16,
    },
    image2: {
        marginTop: 54,
        width: 171,
        height: undefined,
        aspectRatio: 2.27,
    },
    view2: {
        marginTop: 27,
    },
    loginButton: {
        backgroundColor: "#FDC100",
        borderRadius: 15,
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButtonText: {
        color: "#FFF",
        fontSize: 15,
    },
    text: {
        fontSize: 20,
        fontFamily: "Nunito, sans-serif",
        textAlign: "center",
    },
    view3: {
        borderRadius: 8,
        backgroundColor: "#FFCE38",
        marginTop: 26,
        width: 248,
        height: 48,
    },
    view4: {
        alignSelf: "stretch",
        display: "flex",
        marginTop: 33,
        alignItems: "center",
        fontSize: 10,
    },
    image3: {
        width: 150,
        height: undefined,
        aspectRatio: 1.37,
    },
    view5: {
        marginTop: 82,
    },
    versionText: {
        fontFamily: "Nunito, sans-serif",
        textAlign: "center",
    },
});

export default MyComponent;