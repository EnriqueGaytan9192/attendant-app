import { PaperProvider } from "react-native-paper";
import AppNavigator from "../presentation/navigation/AppNavigator";
import { theme } from "../presentation/theme/theme";

const RootLayout = () => {
    return (
        <PaperProvider theme={ theme }>
            <AppNavigator />
        </PaperProvider>
    );
};

export default RootLayout;