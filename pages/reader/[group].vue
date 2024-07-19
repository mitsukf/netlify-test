<script setup>
const dataStore = userDataStore();
const route = useRoute();

const urls = dataStore.getGroupUrls(route.params.group).urls;

const response = useFetch("/api/getRssItems", { query: { urls } });
</script>

<template>
  <section class="container-fluid mt-2">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>#{{ $route.params.group }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rss in response.data.value" :key="rss">
          <td>
            <a :href="rss.item.link">{{ rss.item.title }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
