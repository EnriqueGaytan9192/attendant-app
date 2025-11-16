import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

const CustomHeader = ({ title, navigation }) => {
    return (
        <>
            {/*<Appbar.Header style={ styles.header }>
                <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
                <Appbar.Content
                    title={ title }
                    titleStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
                />
            </Appbar.Header>*/}
        </>
    )
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#006D77"
    }
})

export default CustomHeader;