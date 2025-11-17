import Advances from "../../app/advances";
import Arching from "../../app/arching";
import CloseTurn from "../../app/close_turn";
import Document from "../../app/document";
import Documents from "../../app/documents";
import Inventory from "../../app/inventory";
import Movements from "../../app/movements";
import OpenTurn from "../../app/open_turn";
import PayrollDeductions from "../../app/payroll_deductions";
import ProductPurchases from "../../app/product_purchases";
import Profile from "../../app/profile";

import advances from "../../assets/icons/advances.png";
import applications from "../../assets/icons/applications.png";
import arching from "../../assets/icons/arching.png";
import closeTurn from "../../assets/icons/closeTurn.png";
import document from "../../assets/icons/document.png";
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
        key: 'profile',
        title: 'Perfil',
        //icon: openTurn,
        component: Profile,
    },
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
                component: OpenTurn,
            },
            {
                key: 'sinister',
                title: 'Siniestro',
                icon: sinister,
                component: Movements,
            },
            {
                key: 'applications',
                title: 'Solicitudes',
                icon: applications,
                component: Inventory,
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
        component: PayrollDeductions,
    },
    {
        key: 'advances',
        title: 'Avances',
        icon: advances,
        component: Advances,
    },
    {
        key: 'arching',
        title: 'Arqueos',
        icon: arching,
        component: Arching,
    },
    {
        key: 'close-turn',
        title: 'Cerrar Turno',
        icon: closeTurn,
        component: CloseTurn,
    },
    {
        key: 'document',
        title: 'Documento',
        icon: document,
        component: Document,
    },
    {
        key: 'product-purchases',
        title: 'Compras',
        icon: productPurchases,
        component: ProductPurchases,
    },
]

export default routes;