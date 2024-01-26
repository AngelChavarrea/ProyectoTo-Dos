import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { createRouter, createWebHistory } from 'vue-router';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'; 


import Button  from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toolbar from 'primevue/toolbar';
import Divider from 'primevue/divider';
import OrderList from 'primevue/orderlist';
import Tooltip from 'primevue/tooltip';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice'

import Dialog from 'primevue/dialog';


import vuefire from 'vuefire'
const app = createApp(App);

const routes = [
    { path: '', component: () => import('./components/login.vue')  },
    { path: '/crear-cuenta', component: () => import('./components/crearCuenta.vue')  },
    { path: '/home', component: () => import('./components/home.vue')  },
];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  

app.use(PrimeVue, { ripple: true  });
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.use(router);
app.use(vuefire);


app.component('Button', Button );
app.component('InputText', InputText );
app.component('Toolbar', Toolbar );
app.component('Divider', Divider );
app.component('OrderList', OrderList );
app.component('ConfirmPopup', ConfirmPopup );
app.component('ConfirmDialog', ConfirmDialog );
app.component('Toast', Toast );
app.component('Dialog', Dialog );
app.directive('tooltip', Tooltip);

app.mount("#app");


export { app };