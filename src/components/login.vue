<template>
    <div class="w-full h-screen flex justify-content-center align-content-center flex-wrap">
        <div class="w-7 p-4 border-round-lg solid border-2 surface-border grid shadow-5">
            <div class="col-4 flex justify-content-center align-content-center flex-wrap">
                <img alt="logo" src="../assets/icon_login_v2.jpg" class="w-12 h-max">
            </div>
            <div class="col-8 flex justify-content-center align-content-center flex-wrap">
                <div class="w-8">
                    <h1 class="m-0 w-full text-center">Iniciar Sesión</h1>
                    <p class="mt-4 text-left m-0 ml-1 text-primary font-bold">Usuario</p>
                    <span class="p-input-icon-right mt-2 text-left w-full">
                        <i class="pi pi-user"/>
                        <InputText class="w-full" v-model="usuario" size="small" placeholder="Ingrese su usuario"/>
                    </span>
                    <p class="mt-4 text-left m-0 ml-1 text-primary font-bold">Contraseña</p>
                    <span class="p-input-icon-right mt-2 text-left w-full">
                        <i v-bind:class="{ 'pi-eye-slash': contrasenaVisible, 'pi-eye': !contrasenaVisible}" v-on:click="cambiarEstado" class="pi cursor-pointer"/>
                        <InputText :type="(!contrasenaVisible) ? 'password' : 'text'" class="w-full" v-model="password" size="small" placeholder="Ingrese su contraseña"/>
                    </span>
                    <p v-on:click="crearCuenta" class="mt-3 text-right m-0 ml-1 text-indigo-500 font-semibold underline text-sm cursor-pointer">Crear cuenta</p>
                    <div class="w-full flex justify-content-center flex-wrap">
                        <Button label="Ingresar" :disabled="usuario=='' || password==''"  @click="iniciarSesion()" class="mt-4"/> 
                    </div>
                </div>
            </div>
            <!-- <Button label="Haz clic en mí"/> -->
        </div>
    </div>
</template>

<script>
   
</script>