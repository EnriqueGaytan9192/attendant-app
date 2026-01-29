import Advances from "../../app/advances";
import Arching from "../../app/arching";
import CloseTurn from "../../app/close_turn";
import Consultations from "../../app/consultations";
import Documents from "../../app/documents";
import Inventory from "../../app/inventory";
import Applications from "../../app/management/applications";
import Pqrs from "../../app/management/pqrs";
import Sinister from "../../app/management/sinister";
import Movements from "../../app/movements";
import OpenTurn from "../../app/open_turn";
import AreaManagers from "../../app/payroll_deductions/area_managers";
import Operators from "../../app/payroll_deductions/operators";
import ProductPurchases from "../../app/product_purchases";
import Profile from "../../app/profile";

import advances from "../../assets/icons/advances.png";
import applications from "../../assets/icons/applications.png";
import arching from "../../assets/icons/arching.png";
import closeTurn from "../../assets/icons/closeTurn.png";
import consultations from "../../assets/icons/consultations.png";
import deductionsNomina from "../../assets/icons/deductionsNomina.png";
import documents from "../../assets/icons/documents.png";
import inventory from "../../assets/icons/inventory.png";
import management from "../../assets/icons/management.png";
import movements from "../../assets/icons/movements.png";
import openTurn from "../../assets/icons/openTurn.png";
import payrollDeductions from "../../assets/icons/payrollDeductions.png";
import pqrs from "../../assets/icons/pqrs.png";
import productPurchases from "../../assets/icons/product_purchases.png";
import sinister from "../../assets/icons/sinister.png";

const routes = [
    {
        key: 'open-turn',
        title: 'Abrir Turno',
        icon: openTurn,
        component: OpenTurn,
    },
    {
        key: 'movements',
        title: 'Movimientos',
        icon: movements,
        component: Movements,
    },
    {
        key: 'inventory',
        title: 'Inventario',
        icon: inventory,
        component: Inventory,
    },
    {
        key: 'management',
        title: 'Gestión',
        icon: management,
        children: [
            {
                key: 'pqrs',
                title: 'PQRS',
                icon: pqrs,
                component: Pqrs,
            },
            {
                //key: 'sinister',
                key: 'siniestro',
                title: 'Siniestro',
                icon: sinister,
                component: Sinister,
            },
            {
                //key: 'applications',
                key: 'solicitudes',
                title: 'Solicitudes',
                icon: applications,
                component: Applications,
            },
        ]
    },
    {
        key: 'documents',
        title: 'Documentos',
        icon: documents,
        component: Documents,
    },
    {
        key: 'payroll-deductions',
        title: 'Descuentos de Nomina',
        icon: payrollDeductions,
        children: [
            {
                key: 'operators',
                title: 'Operarios',
                icon: deductionsNomina,
                component: Operators,
            },
            {
                key: 'area-managers',
                title: 'Jefes',
                icon: deductionsNomina,
                component: AreaManagers,
            },
        ]
    },
    {
        //key: 'advances',
        key: 'advance',
        title: 'Avances',
        icon: advances,
        component: Advances,
    },
    {
        //key: 'arching',
        key: 'arqueo',
        title: 'Arqueos',
        icon: arching,
        component: Arching,
    },
    {
        //key: 'close-turn',
        key: 'cerrar-turno',
        title: 'Cerrar Turno',
        icon: closeTurn,
        component: CloseTurn,
    },
    {
        key: 'consultations',
        title: 'Consultas',
        icon: consultations,
        component: Consultations,
    },
    {
        //key: 'product-purchases',
        key: 'compras',
        title: 'Compras',
        icon: productPurchases,
        component: ProductPurchases,
    },
    {
        key: 'profile',
        title: 'Perfil',
        //icon: openTurn,
        component: Profile,
    },
]

export default routes;