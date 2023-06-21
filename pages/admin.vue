<template>
  <!-- <div class="bg-local"  style="background-image: url(file:///C:/Users/vittor.souza/Desktop/Programa%20Polis/BG%20do%20programa.jpg);"> -->
  <h1 class="text-[50px] text-center font-bold">Polis</h1>
  <div class="m-auto w-fit">
    <div>
      <button type="submit" class="m-auto underline bg-primary-500 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" @click="navigateTo('/create-user')">Cadastrar Usuário</button>
      <button type="submit" class= "m-auto underline bg-primary-500 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Estoque CPD</button>
      <button type="submit" class="m-auto underline bg-primary-500 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Lista de Chamados em Aberto</button>
      <button type="submit" class="m-auto underline bg-primary-500 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Chamados Concluídos</button>
      <button type="submit" class="m-auto underline bg-primary-500 text-white p-1 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Funcionário CPD</button>
      <button type="submit" @click="logout" class="m-auto underline bg-red-500 text-white p-1 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Logout</button>
    </div>
  </div>

  <div class="w-full">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Chamados Pendentes</h1>
          <!-- <p class="mt-2 text-sm text-gray-700">Lista de Chamados abertos</p> -->
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Adicionar Novo</button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-0">ID</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-0">Nome</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-0">Assunto</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-bold text-gray-900">Secretaria</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-bold text-gray-900">E-mail</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-bold text-gray-900">Acesso Remoto</th>
                  <!-- <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">Editar</span>
                  </th> -->
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="ticket in tickets" :key="ticket.id" class="cursor-pointer hover:bg-gray-100">
                  <td class="whitespace-nowrap py-4 pl-4 text-sm">#{{ ticket.id }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 text-sm">{{ ticket.user.name }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 text-sm">{{ ticket.subject }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">{{ ticket.user.secretaryId ?? "-" }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">{{ ticket.user.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">{{ ticket.user.remoteAccess ?? "-" }}</td>
                  <!-- <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Editar<span class="sr-only">, Nome</span></a>
                  </td> -->
                </tr>

                <!-- More people... -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth", "admin"] });
useHead({ title: "Polis - Admin" });

const { logout } = useUserStore();
const ticketRepository = useTicket();

const tickets = ref<TicketList[]>([]);
const options = ref(0);

function getTicketsPendents(){
  ticketRepository.fetchPendent()
    .then(res => {
      tickets.value = res.data;
    });
}

onMounted(() => {
  getTicketsPendents();
});

</script>