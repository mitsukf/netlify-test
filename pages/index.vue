<script setup>
import { storeToRefs } from "pinia";
const counterStore = useCounterStore();
const { increment } = counterStore;
const { count } = storeToRefs(counterStore);
</script>

<template>
  <div>
    <Head>
      <Title>rss-reader</Title>
      <Meta name="rss-reader" content="rss-reader" />
    </Head>
    <ul class="list-group">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
      <li class="list-group-item">A fourth item</li>
      <li class="list-group-item">And a fifth one</li>
    </ul>
  </div>

  <v-container>
    <h1>Count:{{ count }}</h1>
    <v-btn class="btn btn-primary" @click="increment">+1する</v-btn>
    <nuxt-link to="/" class="ml-4">もどる</nuxt-link>
  </v-container>
</template>
