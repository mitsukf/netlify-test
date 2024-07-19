<script setup lang="ts">
import type { Group, Setting } from "~/composables/type";

const dataStore = userDataStore();
const { groups, setGroups } = dataStore;

const settings = ref([] as Setting[]);

// 設定用データにstateの値をコピー
console.log(JSON.stringify(groups));
groups.forEach((group: Group) =>
  settings.value.push({
    name: group.name,
    urls: group.urls.join("\n"),
  } as Setting)
);

// 変更前設定データ
let beforeSettings = JSON.stringify(settings.value);

// stateに設定用データを保存
const saveSettings = () => {
  const answer = window.confirm("設定を保存してもよろしいでしょうか？");
  if (answer) {
    // 保存処理
    const changedGroups: Group[] = [];
    settings.value.forEach((setting: Setting) => {
      if (setting.name) {
        changedGroups.push({
          name: setting.name,
          urls: setting.urls.split("\n"),
        } as Group);
      }
    });
    setGroups(changedGroups);

    // 変更前設定データを更新
    beforeSettings = JSON.stringify(settings.value);
  }
};

// 設定削除
const delSetting = (delIndex: number) => {
  const answer = window.confirm(
    "「" + settings.value[delIndex].name + "」を削除しますか？"
  );
  if (answer) {
    settings.value = settings.value.filter(
      (n: any, index: number) => index !== delIndex
    );
  }
};

// 空の設定を追加
const addSetting = () => {
  settings.value.push({
    name: "",
    urls: "",
  } as Setting);
};

// 設定変更判定
const isSettingChanged = () => {
  return beforeSettings !== JSON.stringify(settings.value);
};

// ページ遷移時にポップアップを表示
//useConfirmUnload(isSettingChanged);
</script>

<template>
  <div class="container-fluid mt-2">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th style="width: 40px">#</th>
          <th>設定項目</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(group, index) in settings" :key="index">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <div class="input-group">
              <span class="input-group-text" style="width: 70px">設定名</span>
              <input type="text" class="form-control" v-model="group.name" />
            </div>
            <div class="input-group mt-1">
              <span class="input-group-text" style="width: 70px">URL</span>
              <textarea class="form-control" v-model="group.urls" />
            </div>
            <button
              class="btn btn-danger btn-sm mt-1"
              @click="delSetting(index)"
            >
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary" @click="addSetting()">追加</button>
    <button
      v-bind:disabled="!isSettingChanged()"
      class="btn btn-success ms-2"
      @click="saveSettings"
    >
      保存
    </button>
  </div>
</template>
