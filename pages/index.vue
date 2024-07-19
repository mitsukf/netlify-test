<script setup>
import { storeToRefs } from "pinia";

const dataStore = userDataStore();
const { init } = dataStore;
const { getGroupNames } = storeToRefs(dataStore);

init();
const items = getGroupNames;
</script>

<template>
  <div>
    <Head>
      <Title>rss-reader</Title>
      <Meta name="rss-reader" content="rss-reader" />
    </Head>
    <section class="container-fluid mt-2">
      <table class="table table-bordered">
        <tbody>
          <tr v-for="item in items" :key="item">
            <td>
              <NuxtLink :to="'/reader/' + item">{{ item }}</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
