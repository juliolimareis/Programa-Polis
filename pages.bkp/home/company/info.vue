<template>
   <div class="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Dados da Empresa
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">

        <LoaderText v-if="isLoadingForm" />

        <div v-else>
          <div class="mt-2">
            <Input
              type="text"
              :label="'* Name'"
              :value="formData.name"
              :on-change="(value: string) => formData.name = value"
              :validate="(value: string) => strMin(value, 2)"
              :on-validate="(isError: boolean) => formDataValidate.name = isError"
              :helper-text="'Nome deve conter no mínimo 2 letras.'"
              :validate-on-update="isValideAll"
              :disabled="disableForm"
              validate-with-on-blur
              />
            </div>

            <div class="mt-2">
              <Input
              type="text"
              :label="'* CNPJ'"
              :value="formData.cnpj"
              :on-change="(value: string) => formData.cnpj = value"
              :validate="'cnpj'"
              :on-validate="(isError: boolean) => formDataValidate.cnpj = isError"
              :helper-text="'CNPJ Inválido.'"
              :validate-on-update="isValideAll"
              :disabled="disableForm"
              validate-with-on-blur
              />
            </div>

            <div class="mt-2">
              <Input
              type="text"
              :label="'* Telefone'"
              :value="formData.tel"
              :on-change="(value: string) => formData.tel = value"
              :validate="'phone'"
              :on-validate="(isError: boolean) => formDataValidate.tel = isError"
              :helper-text="'Telefone Inválido.'"
              :validate-on-update="isValideAll"
              :disabled="disableForm"
              validate-with-on-blur
              />
            </div>

            <div class="mt-2">
              <Input
              type="text"
              :label="'* E-mail'"
              :value="formData.email"
              :on-change="(value: string) => formData.email = value"
              :validate="'email'"
              :on-validate="(isError: boolean) => formDataValidate.email = isError"
              :helper-text="'E-mail inválido.'"
              :validate-on-update="isValideAll"
              :disabled="disableForm"
              validate-with-on-blur
              />
            </div>

            <div class="mt-2">
              <Input
              type="text"
              :label="'Website'"
              :value="formData.siteUrl"
              :on-change="(value: string) => formData.siteUrl = value"
              :validate="(value: string) => {
                if(value) return isWebUrl(value)
                return true;
              }"
              :on-validate="(isError: boolean) => formDataValidate.siteUrl = isError"
              :helper-text="'Website inválido.'"
              :validate-on-update="isValideAll"
              :disabled="disableForm"
              validate-with-on-blur
            />
          </div>

          <div class="mt-2">
            <Input
              type="text"
              :label="'Telefone Comercial (Ex: Whatsapp)'"
              :value="formData.whatsapp"
              :on-change="(value: string) => formData.whatsapp = value"
              :disabled="disableForm"
            />
          </div>

          <div class="mt-2">
            <Input
              type="text"
              :label="'* CEP'"
              :value="formData.code"
              :on-change="(value: string) => formData.code = value"
              :validate="'cep'"
              :on-validate="handleAddress"
              :helper-text="'CEP inválido'"
              :validate-on-update="isValideAll"
              validate-with-on-blur
              :disabled="disableForm"
            />
          </div>

          <p v-if="isLoadingAddress" class="mt-10 text-center text-sm text-gray-600 bg-primary-200 rounded-sm p-4 transform">
            Carregando endereço ...
          </p>

          <div v-if="isAddressSearchFinish && !isLoadingAddress">

            <div class="mt-2">
              <Input
                type="text"
                :label="'* Logradouro'"
                :value="formData.street"
                :on-change="(value: string) => formData.street = value"
                :validate="(value: string) => value"
                :on-validate="(isError: boolean) => formDataValidate.street = isError"
                :helper-text="'Campo obrigatório'"
                :validate-on-update="isValideAll"
                validate-with-on-blur
                :disabled="disableForm"
              />
            </div>

            <div class="mt-2">
              <Input
                type="text"
                :label="'* Número'"
                :value="formData.number"
                :on-change="(value: string) => formData.number = value"
                :validate="(value: string) => !!(value)"
                :on-validate="(isError: boolean) => formDataValidate.number = isError"
                :helper-text="'Campo obrigatório'"
                :validate-on-update="isValideAll"
                validate-with-on-blur
                :disabled="disableForm"
              />
            </div>

            <div class="mt-2">
              <Input
                type="text"
                :label="'* Cidade'"
                :value="formData.city"
                :on-change="(value: string) => formData.city = value"
                :validate="(value: string) => value"
                :on-validate="(isError: boolean) => formDataValidate.city = isError"
                :helper-text="'Campo obrigatório'"
                :validate-on-update="isValideAll"
                validate-with-on-blur
                :disabled="disableForm"
              />
            </div>

            <div class="mt-2">
              <Input
                type="text"
                :label="'* UF'"
                :value="formData.uf"
                :on-change="(value: string) => formData.uf = value"
                :validate="'uf'"
                :on-validate="(isError: boolean) => formDataValidate.uf = isError"
                :helper-text="'UF inválido'"
                :validate-on-update="isValideAll"
                validate-with-on-blur
                :disabled="disableForm"
              />
            </div>

            <div class="mt-2">
              <Input
                type="text"
                :label="'* Bairro'"
                :value="formData.neighborhood"
                :on-change="(value: string) => formData.neighborhood = value"
                :validate="(value: string) => value"
                :on-validate="(isError: boolean) => formDataValidate.neighborhood = isError"
                :helper-text="'Campo obrigatório'"
                :validate-on-update="isValideAll"
                validate-with-on-blur
                :disabled="disableForm"
              />
            </div>

            <div class="mt-2">
              <Input
                type="text"
                :label="'Complemento'"
                :value="formData.complement"
                :on-change="(value: string) => formData.complement = value"
                :disabled="disableForm"
              />
            </div>

          </div>

          <p v-if="statusResponse >= 400 && statusResponse !== 404" class="mt-10 text-center text-sm text-gray-600 bg-red-100 rounded-sm p-4 transform">
           Erro encontrado: {{ statusResponse }}
          </p>

         <div v-if="!disableForm" class="mt-5">
           <Button @click="onSend"
             :is-loading="isLoading"
             loading-size="md"
             is-width-full
           >
             Salvar
           </Button>
         </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>

definePageMeta({ middleware: ["auth"] });

const statusResponse = ref(-1);
const isLoading = ref(false);
const isLoadingForm = ref(true);
const isLoadingAddress = ref(false);
const isAddressSearchFinish = ref(false);
const isValideAll = ref(false);
const disableForm = ref(true);

const companyRepository = useCompany();
const viaCepRepository = useViaCep();

const formData = reactive<CreateTicket>({
  name: "",
  cnpj: "",
  tel: "",
  email: "",

  siteUrl: "",
  whatsapp: "",

  street: "",
  number: "",
  code: "",
  city: "",
  uf: "",
  neighborhood: "",
  complement: ""
});

const formDataValidate = reactive({
  name: true,
  cnpj: true,
  tel: true,
  email: true,

  siteUrl: true,
  whatsapp: true,

  street: true,
  number: true,
  code: true,
  city: true,
  uf: true,
  neighborhood: true,
  complement: true
});

function onSend(){
  if (!validateFormData(formDataValidate)) {
    isValideAll.value = true;

    return;
  }

  isLoading.value = true;

  companyRepository.dispatch(formData)
    .then(() => {
      disableForm.value = true;
      statusResponse.value = 200;
    })
    .catch((err) => {
      statusResponse.value = err?.response?.status ?? 0;
    }).finally(() => {
      isLoading.value = false;
    });
}

function handleAddress(isError: boolean){
  formDataValidate.code = isError;

  if(!isError){
    isLoadingAddress.value = true;
    isAddressSearchFinish.value = false;

    viaCepRepository.getAddress(formData.code)
      .then(({ data }) => {
        formData.city = data.localidade;
        formData.street = data.logradouro;
        formData.neighborhood = data.bairro;
        formData.uf = data.uf;
      }).finally(() => {
        isLoadingAddress.value = false;
        isAddressSearchFinish.value = true;
      });
  }
}

function getMyCompany(){
  isLoadingForm.value = true;

  companyRepository.fetchMy()
    .then(({ data }) => {
      disableForm.value = true;

      Object.keys(formData).forEach((key) => {
        //@ts-ignore
        formData[key] = data[key] ?? "";
      });

      isAddressSearchFinish.value = true;
      disableForm.value = true;
    })
    .catch((err) => {
      statusResponse.value = err?.response?.status ?? 0;

      if(statusResponse.value === 404){
        disableForm.value = false;
      }
    }).finally(() => {
      isLoadingForm.value = false;
    });
}

useHead({ title: "Home - Empresa" });

onMounted(() => {
  getMyCompany();
});

</script>