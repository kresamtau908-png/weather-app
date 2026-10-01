import { WeatherInfoJSON } from "./Interface.ts"

export class WeatherInfo {
  private _weatherInfoJSON: WeatherInfoJSON;

  constructor(weatherInfoJSON: WeatherInfoJSON) {
    this._weatherInfoJSON = weatherInfoJSON;
  }

  // 時刻
  get aroundTime() {
    const date = new Date(this._weatherInfoJSON.dt * 1000);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const time = date.toLocaleTimeString("ja-JP");

    return `${year}/${month}/${day} ${time}`;
  }

  // 都市名
  get cityName() {
    return this._weatherInfoJSON.name;
  }

  // 緯度
  get latitude() {
    const coord = this._weatherInfoJSON.coord;
    return coord.lat;
  }

  // 経度
  get longitude() {
    const coord = this._weatherInfoJSON.coord;
    return coord.lon;
  }

  // 天気情報
  get weatherDesc() {
    const weatherArry = this._weatherInfoJSON.weather;
    const weather = weatherArry[0];
    return weather.description;
  }

  // 天気分類
  get weatherMain() {
    const weatherArray = this._weatherInfoJSON.weather;
    const weather = weatherArray[0];
    return weather.main;
  }

  // 気温
  get temperature() {
    const main = this._weatherInfoJSON.main;
    return main.temp;
  }

  // 湿度
  get humidity() {
    const main = this._weatherInfoJSON.main;
    return main.humidity;
  }

  // 風速
  get speed() {
    const wind = this._weatherInfoJSON.wind;
    return wind.speed;
  }

  // 天気アイコン
  get weatherIcon() {
    const weatherArray = this._weatherInfoJSON.weather;
    const weather = weatherArray[0];
    return weather.icon;
  }

  // 体感温度
  get feels_like() {
    const main = this._weatherInfoJSON.main;
    return main.feels_like;
  }

  // 最高気温
  get temp_max() {
    const main = this._weatherInfoJSON.main;
    return main.temp_max;
  }

  // 最低気温
  get temp_min() {
    const main = this._weatherInfoJSON.main;
    return main.temp_min;
  }

  // 気圧
  get pressure() {
    const main = this._weatherInfoJSON.main;
    return main.pressure;
  }

  // 日の出
  get sunriseTime() {
    const data = new Date(this._weatherInfoJSON.sys.sunrise * 1000);
    const time = data.toLocaleTimeString("ja-Jp");

    return time;
  }

  // 日の入り
  get sunsetTime() {
    const data = new Date(this._weatherInfoJSON.sys.sunset * 1000);
    const time = data.toLocaleTimeString("ja-Jp");

    return time;
  }


}