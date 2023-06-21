<template>
  <Text class="text-center mb-4" type="title">Pesquisar Empresas</Text>

   <div v-if="companySelected">
    <div class="mb-2">
      <ArrowLeftIcon class="w-8 cursor-pointer" @click="companySelected = undefined"/>
    </div>

    <List :items="companySelected"/>
  </div>

  <div v-else>
    <form v-on:submit.prevent="getCompanies">
      <div class="grid grid-cols-2">
        <div class="col-span-2">
          <Input
            class="w-full"
            placeholder="pesquisar"
            :value="search"
            :on-change="(value: string) => search = value"
            :disabled="isLoading"
          />
        </div>

        <div class="col-end-5 mt-1">
          <Button
            class=""
            has-icon
            type="submit"
            :disabled="isLoading"
          >
            Pesquisar
          <MagnifyingGlassIcon class="w-5"/>
          </Button>
        </div>
      </div>

    </form>

    <LoaderText v-if="isLoading" class="mt-10"/>

    <div v-else>
      <Table>
        <TableHead>
          <TableTitle>Name</TableTitle>
          <TableTitle>CNPJ</TableTitle>
          <TableTitle>email</TableTitle>
        </TableHead>

        <TableBody>
          <TableRow
            v-for="company in companies"
            :key="company.id"
            class="cursor-pointer hover:bg-gray-100"
            @click="selectItem(company)"
          >
            <TableCell>{{ company.name }}</TableCell>
            <TableCell>{{ company.cnpj }}</TableCell>
            <TableCell>{{ company.email }}</TableCell>

          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ArrowLeftIcon, } from "@heroicons/vue/24/solid";
import { MagnifyingGlassIcon, } from "@heroicons/vue/20/solid";
import { ItemList, } from "~/components/List.vue";

const companyRepository = useCompany();
const companies = ref<Company[]>([]);
const isLoading = ref(true);
const search = ref("");
const companySelected = ref<ItemList[]>();

function selectItem(company: Company){
  companySelected.value = [
    {
      title: "Nome",
      desc: company.name,
    },
    {
      title: "CNPJ",
      desc: company.cnpj,
    },
    {
      title: "Telefone",
      desc: company.tel,
    },
    {
      title: "E-mail",
      desc: company.email,
    },
    {
      title: "Website",
      desc: company.siteUrl ?? "-",
      isUrl: true
    },
    {
      title: "Telefone Comercial",
      desc: company.whatsapp ?? "-",
    },
    {
      title: "CEP",
      desc: company.code,
    },
    {
      title: "Logradouro",
      desc: company.street,
    },
    {
      title: "Número",
      desc: company.number,
    },
    {
      title: "Cidade",
      desc: company.city,
    },
    {
      title: "UF",
      desc: company.uf,
    },
    {
      title: "Bairro",
      desc: company.neighborhood,
    },
    {
      title: "Complemento",
      desc: company.complement ?? "-",
    },

  ];
}

function getCompanies(){
  companyRepository.search({ search: search.value })
    .then(res => {
      companies.value = res.data.rows;
    }).finally(() => isLoading.value = false);
}

onMounted(() => {
  getCompanies();
});

useHead({ title: "Home - Pesquisar Empresas" });

</script>