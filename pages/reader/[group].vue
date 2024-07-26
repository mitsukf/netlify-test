<script setup>
const dataStore = userDataStore();
const route = useRoute();

console.log("▲▲▲▲▲");
const group = dataStore.getGroupUrls(route.params.group);
let urls = [];
if (group) {
  console.log("1こっち");
  urls = group.urls;
}

console.log("■■■■■");
console.log(urls);
const response = useFetch("/api/getRssItems", { query: { urls } });

// 日付フォーマットから日時を取得
const getDateTime = (dateString) => {
  return dateString.slice(5);
};
</script>

<style scoped>
.site {
  font-size: 70%;
  color: grey;
}
.site a {
  text-decoration: none;
  color: grey;
}
.item a {
  text-decoration: none;
}
</style>

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
            <div class="site">
              {{ getDateTime(rss.item.date) }}　
              <a :href="rss.site.link">{{ rss.site.name }}</a>
            </div>
            <div class="item">
              <a :href="rss.item.link">{{ rss.item.title }}</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
