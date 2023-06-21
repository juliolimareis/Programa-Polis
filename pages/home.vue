<template>
   <h1 class="text-[50px] text-center font-bold">Polis</h1>
    <div class="m-auto w-fit">
      <br>
      <div>
          <div>
            <label for="titulo">Titulo do Problema</label>
          </div>
          <input name="titulo" class="border border-black rounded-lg w-full"  type="text" placeholder="Titulo do Problema"> 
          </div>
   
      <div>
        <label for="desk">Detalhes do Problema</label>
        <br>
          <textarea name="desk" class="border border-black rounded-lg pr-52 pb-32"  placeholder="Detalhes do Problema" minlength="10"></textarea>
      </div>
      <br>
      <div>
        <button type="submit" class="m-auto bg-primary-500 shadow-lg shadow-blue-500/50 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Enviar</button>
        <button type="submit" class= "m-auto bg-primary-500 shadow-lg shadow-blue-500/50 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Cancelar</button>
      </div>

      <div>
        <button type="submit" @click="logout" class="m-auto mt-20 bg-red-500 text-white p-1 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Sair do sistema</button> 
      </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });
useHead({ title: "Polis - Home" });

const { logout } = useUserStore();

</script>