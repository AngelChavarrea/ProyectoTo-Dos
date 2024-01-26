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
                
                        </span>
                        <div class="mt-2 w-full" style="height: 1px; background-color: #e5e7eb;"></div>
                    </div>
                </template>
            </OrderList>
        </div>
    </div>
</template>

<script>
   
</script>

<style scoped>
.componente-padre /deep/ .p-orderlist .p-orderlist-controls {
  display: none!important;
}
</style>