import { WeatherInfo } from "./WeatherInfo.js";
// 非同期で天気情報を取得する関数
export async function receiveWeatherInfo(url) {
    // URLのに非同期でアクセスしデータを取得
    const response = await fetch(url);
    // 取得したデータを非同期でJSONに変換
    const weatherInfoJSON = await response.json();
    // WeatherInfoオブジェクトの生成、リターン
    const weatherInfo = new WeatherInfo(weatherInfoJSON);
    return weatherInfo;
}
