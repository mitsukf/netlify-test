import Parser from "rss-parser";
import moment from "moment-timezone";

// URLからRSS情報を取得
async function fetchData(url: string) {
  let response;
  try {
    const parser = new Parser({ timeout: 1000 });
    response = await parser.parseURL(url);
  } catch (e) {
    // fetchに失敗しても処理継続
    console.log(e);
  }
  return response;
}

// RSS情報をUI表示用のjsonに変換
function formatFeedResponse(data: any) {
  return data.items.map((item: any) => {
    let date = item.date;
    if (item.pubDate) {
      date = item.pubDate;
    }

    return {
      site: {
        name: data.title,
        link: data.link,
      },
      item: {
        title: item.title,
        link: item.link,
        date: moment(date).tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm"),
      },
    };
  });
}

export default defineEventHandler((event) => {
  // クエリパラメータからURL配列を作成
  let urls = getQuery(event).urls;
  if (!Array.isArray(urls)) {
    urls = urls ? [urls] : [];
  }

  const feeds: any = [];
  return new Promise((resolve) => {
    Promise.all(urls.map(fetchData)).then((responses) => {
      // レスポンスをパース
      responses.map((response) => {
        if (response) {
          feeds.push(...formatFeedResponse(response));
        }
      });

      // 日付順にソート
      feeds.sort((a: any, b: any) => {
        if (a.item.date > b.item.date) return -1;
        if (a.item.date < b.item.date) return 1;
        return 0;
      });

      resolve(feeds);
    });
  });
});
