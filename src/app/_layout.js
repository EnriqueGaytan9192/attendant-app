import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import AppNavigator from "../presentation/navigation/AppNavigator";
import { theme } from "../presentation/theme/theme";
import { store } from "../state/store";

const RootLayout = () => {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <AppNavigator />
            </PaperProvider>
        </Provider>
    );
};

export default RootLayout;