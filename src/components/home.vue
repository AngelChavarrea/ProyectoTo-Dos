<template>
    <Toolbar class="bg-gray-900 shadow-2" style="background-image: linear-gradient(to right, var(--primary-500), var(--primary-700))">
            <template #center>
                <div class="flex flex-wrap align-items-center gap-3">
                    <span class="font-bold text-bluegray-50">Usuario Conectado: {{ usuario }}</span>
                </div>
            </template>
            <template #end>
                <i class="pi pi-sign-out text-white cursor-pointer" v-tooltip.left="'Cerrar Sesión'" @click="cerrarSesion"></i>
            </template>
    </Toolbar>
    <div class="w-full mt-4 flex justify-content-center flex-wrap">
        <p class="m-0 w-full text-center text-2xl text-indigo-500 font-semibold">Crear tarea</p>
        <div class="w-6 grid mt-2">
           <div class="col grid">
             <span class="p-input-icon-right mt-2 text-left col-6">
                         <InputText class="w-full" v-model="nombre"  placeholder="Nombre de la tarea"/>
             </span>
             <span class="p-input-icon-right mt-2 text-left col-6">
                         <InputText class="w-full" v-model="descripcion"  placeholder="Descrición de la tarea"/>
             </span>
           </div>
           <div class="w-max col-fixed">
                <Button :disabled="nombre=='' || descripcion==''"  @click="creartarea()" label="Crear" severity="secondary" class="mt-2"/> 
           </div>
        </div>
    </div>
    <Divider />
    <div class="w-full grid m-0">
        <div class="card col-6 mb-4 componente-padre">
            <OrderList v-model="tareas" listStyle="height:300px" dataKey="id" class="w-full">
                <template #header>Lista de tareas pendientes</template>
                <template #item="tareas">
                    <div class="w-full grid m-0">
                        <div class="col grid p-0">
                            <p class="col-4 text-left">{{ tareas.item.nombreTarea }}</p>
                            <p class="col-8 font-bold text-900 text-left">{{ tareas.item.descripcionTarea }}</p>
                        </div>
                        <span class="p-buttonset max-content col-fixed">
                            <Button @click="EditarModal(tareas.item.id,tareas.item.nombreTarea,tareas.item.descripcionTarea)" v-tooltip.top="'Modificar tarea'" severity="warning" icon="pi pi-pencil" />
                            <Button @click="EliminarConf(tareas.item.id)" v-tooltip.top="'Eliminar tarea'" severity="danger" icon="pi pi-trash" />
                            <Button @click="FinalizarRegresarTareaConf(tareas.item.id,true)" v-tooltip.top="'Completar tarea'" icon="pi pi-check-square" />
                        </span>
                        <div class="mt-2 w-full" style="height: 1px; background-color: #e5e7eb;"></div>
                    </div>
                </template>
            </OrderList>
        </div>

    <div class="card col-6 mb-4 componente-padre">
            <OrderList v-model="tareasPediente" listStyle="height:300px" dataKey="id" class="w-full">
                <template #header>Lista de tareas completadas</template>
                <template #item="tareasPediente">
                    <div class="w-full grid m-0">
                        <div class="col grid p-0">
                            <p class="col-4 text-left line-through">{{ tareasPediente.item.nombreTarea }}</p>
                            <p class="col-8 font-bold text-900 text-left line-through">{{ tareasPediente.item.descripcionTarea }}</p>
                        </div>
                        <span class="p-buttonset max-content col-fixed">
                            <Button @click="FinalizarRegresarTareaConf(tareasPediente.item.id,false)" v-tooltip.top="'Volver a tareas pendientes'" icon="pi pi-eraser" />
                        </span>
                        <div class="mt-2 w-full" style="height: 1px; background-color: #e5e7eb;"></div>
                    </div>
                </template>
            </OrderList>
        </div>
    </div>
    <ConfirmDialog></ConfirmDialog>
    <Dialog v-model:visible="visible" modal header="Editar tarea" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '45vw', '575px': '75vw' }">
        <div class="w-full grid">
            <span class="p-input-icon-right mt-2 text-left col-12">
                         <InputText class="w-full" v-model="nombreEdit"  placeholder="Nombre de la tarea"/>
             </span>
             <span class="p-input-icon-right mt-2 text-left col-12">
                         <InputText class="w-full" v-model="descripcionEdit"  placeholder="Descrición de la tarea"/>
             </span>
             <div class="col-12 flex justify-content-center flex-wrap">
                <Button :disabled="nombreEdit=='' || descripcionEdit==''"  @click="EditarConf(idTareaTemp)" label="Editar" class="mt-2"/> 
           </div>
        </div>
    </Dialog>
</template>

<script>
   import {db} from '../firebase.js';
// eslint-disable-next-line no-unused-vars
import { getDocs, collection, where, query, addDoc, updateDoc, doc } from 'firebase/firestore';
// eslint-disable-next-line no-unused-vars
import {ref, onMounted} from 'vue';
// eslint-disable-next-line no-unused-vars
import {success, error} from '../myToastService.js';


export default {
    setup(){
    },
    name: 'HomeComponent',
    firebase: {
        //websites: websitesRef
    },
    data(){
        return {
            tareas: [],
            tareasPediente: [],
            nombre: '',
            descripcion: '',
            visible: false,
            usuario: '',
            token: '',
            nombreEdit: '',
            descripcionEdit: '',
            idTareaTemp:'',
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.usuario = localStorage.getItem('usuario');
        if(this.token == null || this.usuario == null){
            this.cerrarSesion();
        }
        else{
            this.cargarTareas(this.token);
        }
    },
    methods: {
        EliminarConf(id) {
            this.$confirm.require({
                message: '¿Está seguro de eliminar la tarea?',
                header: 'Eliminar tarea',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sí', // Cambiar el texto del botón Aceptar
                rejectLabel: 'No',
                accept: () => {
                    this.eliminartarea(id);
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        },
        EditarConf(id) {
            this.$confirm.require({
                message: '¿Está seguro de modificar la tarea?',
                header: 'Modificar tarea',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sí', // Cambiar el texto del botón Aceptar
                rejectLabel: 'No',
                accept: () => {
                    this.editarTarea(id);
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        },
        FinalizarRegresarTareaConf(id,validador) {
            this.$confirm.require({
                message: (validador) ? '¿Está seguro de finalizar la tarea?' : '¿Está seguro de restaurar la tarea?',
                header: (validador) ? 'Finalizar tarea' : 'Restaurar tarea',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sí', // Cambiar el texto del botón Aceptar
                rejectLabel: 'No',
                accept: () => {
                    this.completarRegresarTarea(id,validador);
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        },
        EditarModal(id,nombre,descripcion){
            this.idTareaTemp = id;
            this.visible = true;
            this.nombreEdit = nombre;
            this.descripcionEdit = descripcion;
        },
        async cargarTareas(idPersona) {
            const query2 = query(collection(db, 'tasks'), where('idPersona', '==', idPersona), where('estado', '==', true));
            try {
                const tasksSnapshot = await getDocs(query2);
                if(tasksSnapshot.empty){
                    error('No existe tareas','Actualmente no posees ninguna tarea');
                }
                else{
                    tasksSnapshot.forEach((task) => {
                        if(task.data().completado){
                            this.tareasPediente.push({...task.data(), id: task.id});
                        }
                        else {
                            this.tareas.push({...task.data(), id: task.id});
                        }
                    });
                }
            } catch (error) {
                console.error("Error al cargar las tareas:", error);
                error();
            }
        },
        async eliminartarea(id){
            const object = this.tareas.find(tarea=> tarea.id == id);
            object.estado = false;
            delete object.id;
            console.log(object);
            // eslint-disable-next-line no-unused-vars
            try {
                await updateDoc(doc(db, 'tasks', id), object).then(()=>{
                    this.recargarDatos(object.idPersona);
                    success("Eliminación de tarea exitosa");
                })
            } catch (error) {
                console.error("Error al eliminar la tarea:", error);
                error('Error eliminar tarea');
            }
        },
        async creartarea(){
            const object = {
                nombreTarea: this.nombre,
                descripcionTarea: this.descripcion,
                estado: true,
                completado: false,
                idPersona: this.token
            };

            try {
                await addDoc(collection(db, 'tasks'), object).then(()=>{
                    this.recargarDatos(this.token);
                    this.nombre = '';
                    this.descripcion = '';
                    success("Creación de tarea exitosa");
                })
            } catch (error) {
                console.error("Error al crear la tarea:", error);
                error('Error crear tarea');
            }
        },

        async completarRegresarTarea(id, validador){
            debugger;
            const objectCompletar = (validador) ? this.tareas.find(tarea=> tarea.id == id): this.tareasPediente.find(tarea=> tarea.id == id);
            objectCompletar.completado = validador;
            delete objectCompletar.id;
            // eslint-disable-next-line no-unused-vars
            try {
                await updateDoc(doc(db, 'tasks', id), objectCompletar).then(()=>{
                    this.recargarDatos(objectCompletar.idPersona);
                    success("Consulta exitosa");
                });
            } catch (error) {
                console.error("Error:", error);
                error('Error');
            }
        },

        async editarTarea(id){
            try {
                const object = {
                    nombreTarea: this.nombreEdit,
                    descripcionTarea: this.descripcionEdit,
                    estado: true,
                    completado: false,
                    idPersona: this.token
                };
                await updateDoc(doc(db, 'tasks', id), object).then(()=>{
                    this.recargarDatos(object.idPersona);
                    this.idTareaTemp = '';
                    success("Edición de tarea exitosa");
                    this.visible = false;
                })
            } catch (error) {
                console.error("Error al editar la tarea:", error);
                error('Error');
            }
        },

        async recargarDatos(id){
            this.tareas = [],
            this.tareasPediente = []
            this.cargarTareas(id);
        },

        cerrarSesion(){
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.componente-padre /deep/ .p-orderlist .p-orderlist-controls {
  display: none!important;
}
</style>