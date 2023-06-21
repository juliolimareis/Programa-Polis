<template>
  <div class="grid grid-cols-2 mb-4">
    <Text type="title" variant="span">Empresas Pendentes</Text>
    <ArrowPathIcon class="w-6 cursor-pointer mr-3" @click="getCompaniesPending" />
  </div>

  <div v-if="rowCompanySelected">
    <div class="mb-2">
      <ArrowLeftIcon class="w-8 cursor-pointer" @click="rowCompanySelected = undefined"/>
    </div>

    <div class="float-right">
      <Loader v-if="rowCompanySelected.isLoading"/>
      <div v-else-if="rowCompanySelected.isAccept" class="w-fit p-2 bg-green-300 rounded-md text-white font-semibold">Aprovado</div>
      <Button v-else @click="activePendent(rowCompanySelected)">Aprovar</Button>
    </div>

    <List :items="itemsListSelected"/>
  </div>

  <div v-else>
    <LoaderText v-if="isLoading" />

    <div v-else>

      <div>
      </div>

      <Table v-if="companies.length">
        <TableHead>
          <TableTitle>Name</TableTitle>
          <TableTitle>CNPJ</TableTitle>
          <TableTitle>Ação</TableTitle>
        </TableHead>

        <TableBody>
          <TableRow
            v-for="rowCompany in companies"
            :key="rowCompany.company.id"
            class="cursor-pointer hover:bg-gray-100"
          >
            <TableCell @click="onClickRow(rowCompany)">{{ rowCompany.company.name }}</TableCell>
            <TableCell @click="onClickRow(rowCompany)">{{ rowCompany.company.cnpj }}</TableCell>
            <TableCell>
              <Loader v-if="rowCompany.isLoading"/>
              <div v-else-if="rowCompany.isAccept" class="w-fit p-2 bg-green-300 rounded-md text-white font-semibold">Aprovado</div>
              <Button v-else @click="activePendent(rowCompany)">Aprovar</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <p v-else class="mt-10 text-center text-sm text-gray-600 bg-primary-200 rounded-sm p-4 transform">
        Não há empresas pendentes.
      </p>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { ArrowPathIcon, ArrowLeftIcon, } from "@heroicons/vue/24/solid";
import { ItemList, } from "~/components/List.vue";

type RowCompany = {
  isLoading?: boolean;
  company: Company;
  request: any;
  isAccept?: boolean;
}

const companyRepository = useCompany();

const companies = ref<RowCompany[]>([]);
const rowCompanySelected = ref<RowCompany>();
const itemsListSelected = ref<ItemList[]>([]);
const isLoading = ref(true);

function onClickRow(selected: RowCompany){
  rowCompanySelected.value = selected;
  const companySelected = rowCompanySelected.value.company;

  itemsListSelected.value = [
    {
      title: "Nome",
      desc: companySelected.name,
    },
    {
      title: "CNPJ",
      desc: companySelected.cnpj,
    },
    {
      title: "Telefone",
      desc: companySelected.tel,
    },
    {
      title: "E-mail",
      desc: companySelected.email,
    },
    {
      title: "Website",
      desc: companySelected.siteUrl ?? "-",
      isUrl: true
    },
    {
      title: "Telefone Comercial",
      desc: companySelected.whatsapp ?? "-",
    },
    {
      title: "CEP",
      desc: companySelected.code,
    },
    {
      title: "Logradouro",
      desc: companySelected.street,
    },
    {
      title: "Número",
      desc: companySelected.number,
    },
    {
      title: "Cidade",
      desc: companySelected.city,
    },
    {
      title: "UF",
      desc: companySelected.uf,
    },
    {
      title: "Bairro",
      desc: companySelected.neighborhood,
    },
    {
      title: "Complemento",
      desc: companySelected.complement ?? "-",
    },

  ];
}

function getCompaniesPending(){
  isLoading.value = true;
  companies.value = [];

  companyRepository.fetchPendent()
    .then(({ data }) => {
      data.forEach(c => {
        companies.value.push({
          company: c,
          request: undefined
        });
      });
    }).finally(() => isLoading.value = false);
}

function activePendent(companySelected: RowCompany){
  companySelected.request = companyRepository.dispatchPendent(companySelected.company.id)
    .then(() => {
      companySelected.isAccept = true;
    }).finally(() => companySelected.isLoading = false);
}

onMounted(() => {
  getCompaniesPending();
});

useHead({ title: "Home - Empresas Pendentes" });

</script>