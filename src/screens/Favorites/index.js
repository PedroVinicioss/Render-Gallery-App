import { StyleSheet, Text, View } from "react-native";

export default function Favorites() {
    return (
        <View style={styles.container}>
        <Text>Favorites</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
});