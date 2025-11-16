import Arching from "../../app/arching";
import OpenTurn from "../../app/open_turn";

import arching from "../../assets/icons/hamburger.png";
import openTurn from "../../assets/icons/openTurn.png";

const routes = [
    {
        key: 'open-turn',
        title: 'Apertura de Turno',
        subtitle: 'Bienvenid@ al registro de apertura de turno.',
        icon: openTurn,
        component: OpenTurn,
    },
    {
        key: 'arching',
        title: 'Arqueo',
        subtitle: 'Realizar arqueos por turnos',
        icon: arching,
        component: Arching,
    },
]

export default routes;