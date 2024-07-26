import { defineStore } from "pinia";

export interface group {
  name: string;
  urls: string[];
}

export const userDataStore = defineStore("userData", {
  state: () => ({
    groups: [] as group[],
  }),
  getters: {
    getGroupNames: (state) => {
      return state.groups.map((element) => {
        return element.name;
      });
    },
    getGroupUrls: (state) => {
      return (name: string) => {
        return state.groups.find((element) => {
          return element.name === name;
        });
      };
    },
  },
  actions: {
    init() {
      if (this.groups && this.groups.length > 0) {
        return;
      }

      this.groups = [];
      this.groups.push({
        name: "IT系サイト",
        urls: [
          "https://rss.itmedia.co.jp/rss/2.0/ait.xml",
          "https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml",
        ],
      } as group);
      this.groups.push({
        name: "趣味",
        urls: [
          "https://news.yahoo.co.jp/rss/topics/it.xml",
          "https://news.yahoo.co.jp/rss/topics/entertainment.xml",
        ],
      } as group);
      this.groups.push({
        name: "ニュース",
        urls: [
          "https://news.yahoo.co.jp/rss/categories/domestic.xml",
          "https://news.yahoo.co.jp/rss/categories/world.xml",
        ],
      } as group);
    },
    setGroups(groups: Group[]) {
      this.groups = groups;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
