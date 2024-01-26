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
    
</template>

<script>
   
</script>

<style scoped>
.componente-padre /deep/ .p-orderlist .p-orderlist-controls {
  display: none!important;
}
</style>