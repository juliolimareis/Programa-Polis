<template>
  <Container>
    <div>
      <Text variant="span" type="subtitle" is-bold>id: </Text> {{ company.id }}
    </div>
    <div>
      <Text variant="span" type="subtitle" is-bold>Nome: </Text> {{ company.name }}
    </div>
    <div>
      <Text variant="span" is-bold>CNPJ: </Text> {{ company.cnpj }}
    </div>
    <div>
      <Text variant="span" is-bold>Website: </Text> {{ company.siteUrl }}
    </div>
    <div>
      <Text variant="span" is-bold>E-mail: </Text> {{ company.email }}
    </div>
    <div>
      <Text variant="span" is-bold>Status: </Text> {{ company.status === 0 ? 'Pendente' : 'Ativo' }}
    </div>
    <div>
      <Text variant="span" is-bold>Cidade: </Text> {{ company.city }}
    </div>
    <div>
      <Text variant="span" is-bold>CEP: </Text> {{ company.code }}
    </div>
  </Container>
</template>

<script lang="ts" setup>
defineProps<{
  company: Company
}>();

</script>