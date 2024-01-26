import { ToastSeverity } from 'primevue/api';
// eslint-disable-next-line no-unused-vars
import { createApp } from 'vue';
import { app } from '@/main'; // Asegúrate de que la ruta sea correcta

const lifeTime = 3000;

export function error(title = 'Errores técnicos', body = 'Estamos presentando problemas técnicos por favor intente mas tarde.') {
  app.config.globalProperties.$toast.add({ severity: ToastSeverity.ERROR, summary: title, detail: body, life: lifeTime });
}

export function success(title = 'Consulta exitosa', body = 'La consulta se la realizo de forma exitosa') {
  app.config.globalProperties.$toast.add({ severity: ToastSeverity.SUCCESS, summary: title, detail: body, life: lifeTime });
}
