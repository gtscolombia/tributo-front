import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'Escritorio', '/', null, 'dashboard', null, false, 0),
    new Menu (2, 'Mi cuenta', null, null, 'supervisor_account', null, true, 0),
    new Menu (3, 'Perfil', '/mi-cuenta/perfil', null, 'account_circle', null, false, 2), 
    new Menu (4, 'Datos', '/mi-cuenta/datos', null, 'settings', null, false, 2),
    new Menu (5, 'Estado cuenta', '/estado-cuenta', null, 'check_circle_outline', null, false, 0),    
    new Menu (6, 'Diligenciar, declarar y pagar', '/declarar/entidades', null, 'gavel', null, false, 0),
    new Menu (7, 'Mis contratos', '/1', null, 'work_outline', null, false, 0),
    new Menu (8, 'Acuerdos de pago', '/3',null, 'attach_money', null,false,0),
    new Menu (9, 'Vencimientos', '/2',null, 'update', null,false,0),
    new Menu (10, 'Estadisticas y mensajes', '/1', null, 'trending_up', null, false, 0),

   
]

export const horizontalMenuItems = [ 
    new Menu (1, 'Escritorio', '/', null, 'dashboard', null, false, 0),
    new Menu (2, 'Mi cuenta', null, null, 'supervisor_account', null, true, 0),
    new Menu (3, 'Perfil', '/mi-cuenta/perfil', null, 'account_circle', null, false, 2), 
    new Menu (4, 'Datos', '/mi-cuenta/datos', null, 'settings', null, false, 2),
    new Menu (5, 'Estado cuenta', '/estado-cuenta', null, 'check_circle_outline', null, false, 0),    
    new Menu (6, 'Diligenciar, declarar y pagar', '/declarar/entidades', null, 'gavel', null, false, 0),
    new Menu (7, 'Mis contratos', '/1', null, 'work_outline', null, false, 0),
    new Menu (8, 'Acuerdos de pago', '/3',null, 'attach_money', null,false,0),
    new Menu (9, 'Vencimientos', '/2',null, 'update', null,false,0),
    new Menu (10, 'Estadisticas y mensajes', '/1', null, 'trending_up', null, false, 0),
]