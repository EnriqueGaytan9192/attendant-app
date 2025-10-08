import { MaterialIcons } from "@expo/vector-icons";

const routes = [
    {
        key: 'open-turn',
        title: 'Abrir Turno',
        icon: (props) => <MaterialIcons name="airplanemode-active" {...props} />
    },
    {
        key: 'arching',
        title: 'Arqueo',
        icon: (props) => <MaterialIcons name="assessment" {...props} />
    },
]

export default routes;