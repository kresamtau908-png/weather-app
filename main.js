import { receiveWeatherInfo } from "./weatherinfo-receiver.js";
// アクセス先のURLの基本部分の変数を用意
const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
// クエリパラメータの元のデータとなるオブジェクトリテラルを用意
const params = {
    // 言語設定のクエリパラメータ
    lang: "ja",
    // 都市名を表すクエリパラメータ
    q: "",
    // APIキーのクエリパラメータ
    appId: "ef665d2b7a5c867d451d8f700e22dbc2",
    // 温度などの数値をケルビンから摂氏に変換する
    units: "metric",
};
// HTML要素を取得
const idInput = document.querySelector("#id-input");
const fetchBtn = document.querySelector("#fetch-btn");
const resultEl = document.querySelector("#weather-result");
const idEl = document.querySelector("#city-id");
const latEl = document.querySelector("#weather-lat");
const lonEl = document.querySelector("#weather-lon");
const descEl = document.querySelector("#weather-desc");
const tempEl = document.querySelector("#weather-temp");
const errorEl = document.querySelector("#error-message");
const humEl = document.querySelector("#weather-humidity");
const iconEl = document.querySelector("#weather-icon");
const timeEl = document.querySelector("#around-time");
const speedEl = document.querySelector("#weather-speed");
const page1El = document.querySelector("#page1");
const page2El = document.querySelector("#page2");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const feelsEl = document.querySelector("#feels-like");
const maxEl = document.querySelector("#max-temp");
const minEl = document.querySelector("#min-temp");
const pressureEl = document.querySelector("#weather-pressure");
const sunriseEl = document.querySelector("#sun-rise");
const sunsetEl = document.querySelector("#sun-set");
// 背景色
function changeBackground(temp) {
    resultEl.classList.remove("from-sky-100/85", "to-blue-300/85", "from-blue-100/85", "to-cyan-300/85", "from-green-100/85", "to-green-300/85", "from-yellow-100/85", "to-yellow-300/85", "from-orange-200/85", "to-orange-500/85", "from-red-200/85", "to-red-500/85", "from-red-500/85", "to-red-800/85");
    // 気温で変化
    if (temp >= 40) {
        // 40℃以上
        resultEl.classList.add("from-red-500/85", "to-red-800/85");
    }
    else if (temp >= 35) {
        // 35～40℃未満
        resultEl.classList.add("from-red-200/85", "to-red-500/85");
    }
    else if (temp >= 30) {
        // 30～35℃未満
        resultEl.classList.add("from-orange-200/85", "to-orange-500/85");
    }
    else if (temp >= 25) {
        // 25～30℃未満
        resultEl.classList.add("from-yellow-100/85", "to-yellow-300/85");
    }
    else if (temp >= 15) {
        // 15～25℃未満
        resultEl.classList.add("from-green-100/85", "to-green-300/85");
    }
    else if (temp >= 0) {
        // 0～15℃未満
        resultEl.classList.add("from-blue-100/85", "to-cyan-300/85");
    }
    else {
        // 0℃未満
        resultEl.classList.add("from-sky-100/85", "to-blue-300/85");
    }
}
// 背景画像
function changeWeatherBackground(weather) {
    const body = document.body;
    if (weather === "Clear") {
        body.style.backgroundImage = "url('./images/sunny.AI.png')";
    }
    else if (weather === "Clouds") {
        body.style.backgroundImage = "url('./images/cloudy.AI.png')";
    }
    else if (weather === "Rain") {
        body.style.backgroundImage = "url('./images/rain.AI.png')";
    }
    else if (weather === "Snow") {
        body.style.backgroundImage = "url('./images/snow.AI.png')";
    }
    else if (weather === "Thunderstorm") {
        body.style.backgroundImage = "url('./images/thunder.AI.png')";
    }
    else if (weather === "Mist") {
        body.style.backgroundImage = "url('./images/mist.AI.png')";
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
}
//入力された都市名をもとに情報を検索、表示する関数
async function search(cityName) {
    const city = cityName ?? idInput.value.trim();
    if (city === "") {
        renderError("都市名を入力してください");
        return;
    }
    params.q = city;
    reset();
    setLoading(true);
    const queryParams = new URLSearchParams(params);
    const urlFull = `${weatherInfoUrl}?${queryParams}`;
    // receiveWeatherInfo関数を実行
    const promise = receiveWeatherInfo(urlFull);
    // 非同期処理が成功した場合
    promise.then(renderResult);
    // 非同期処理がエラーとなった場合
    promise.catch(renderError);
    // 成功・失敗に関わらず、取得中の状態を解除する
    promise.finally(() => setLoading(false));
}
// 結果画面の表示する関数
function renderResult(weatherInfo) {
    // 都市名を表示
    idEl.textContent = `${weatherInfo.cityName}`;
    // 時刻を表示
    timeEl.textContent = `${weatherInfo.aroundTime}`;
    // 日の出時刻
    sunriseEl.textContent = `日の出：${weatherInfo.sunriseTime}`;
    // 日の入り時刻
    sunsetEl.textContent = `日の入り：${weatherInfo.sunsetTime}`;
    // 緯度を表示
    if (weatherInfo.latitude != null) {
        latEl.textContent = `緯度：${weatherInfo.latitude}`;
    }
    else {
        latEl.textContent = "(見つかりませんでした)";
    }
    // 経度を表示
    if (weatherInfo.longitude != null) {
        lonEl.textContent = `経度：${weatherInfo.longitude}`;
    }
    else {
        lonEl.textContent = "(見つかりませんでした)";
    }
    // 天気情報を表示
    if (weatherInfo.weatherDesc) {
        descEl.textContent = `${weatherInfo.weatherDesc}`;
    }
    else {
        descEl.textContent = `(見つかりませんでした)`;
    }
    // 気温を取得
    if (weatherInfo.temperature != null) {
        tempEl.textContent = `気温：${weatherInfo.temperature}℃`;
        // 背景色を変更
        changeBackground(weatherInfo.temperature);
    }
    else {
        tempEl.textContent = "(見つかりませんでした)";
    }
    // 湿度を取得
    if (weatherInfo.humidity != null) {
        humEl.textContent = `湿度：${weatherInfo.humidity}%`;
    }
    else {
        humEl.textContent = "(見つかりませんでした)";
    }
    // 風速を表示
    if (weatherInfo.speed != null) {
        speedEl.textContent = `風速：${weatherInfo.speed}m/s`;
    }
    else {
        speedEl.textContent = "(見つかりませんでした)";
    }
    // 体感温度
    if (weatherInfo.feels_like != null) {
        feelsEl.textContent = `体感温度：${weatherInfo.feels_like}℃`;
    }
    else {
        feelsEl.textContent = "(見つかりませんでした)";
    }
    // 最高気温
    if (weatherInfo.temp_max != null) {
        maxEl.textContent = `最高気温：${weatherInfo.temp_max}℃`;
    }
    else {
        maxEl.textContent = "(見つかりません)";
    }
    // 最低気温
    if (weatherInfo.temp_min != null) {
        minEl.textContent = `最低気温：${weatherInfo.temp_min}℃`;
    }
    else {
        minEl.textContent = "(見つかりません)";
    }
    // 気圧
    if (weatherInfo.pressure != null) {
        pressureEl.textContent = `気圧：${weatherInfo.pressure}hPa`;
    }
    else {
        pressureEl.textContent = "(見つかりませんでした)";
    }
    // 天気アイコンを取得
    iconEl.src = `https://openweathermap.org/img/wn/${weatherInfo.weatherIcon}.png`;
    // 背景
    changeWeatherBackground(weatherInfo.weatherMain);
    resultEl.classList.remove("hidden");
}
// エラーを設定し表示する関数
function renderError(error) {
    errorEl.textContent = `エラーが発生しました。\n${error}`;
    errorEl.classList.remove("hidden");
}
;
//  二重クリックを防止する関数
function setLoading(flag) {
    fetchBtn.disabled = flag;
    if (flag) {
        fetchBtn.textContent = "取得中...";
    }
    else {
        fetchBtn.textContent = "検索";
    }
}
// 表示をリセットする関数
function reset() {
    resultEl.classList.add("hidden");
    errorEl.classList.add("hidden");
}
//* 動作
// 検索ボタンがクリックされたら
fetchBtn.addEventListener("click", () => {
    search();
});
// 入力欄でEnterキーが押されたら情報を取得する
idInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        search();
    }
});
// アプリ起動時に札幌の天気を表示
window.addEventListener("load", () => {
    search("sapporo");
});
// →ボタンを押したとき
nextBtn.addEventListener("click", () => {
    page1El.classList.add("hidden");
    page2El.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    prevBtn.classList.remove("hidden");
});
// ←ボタンを押したとき
prevBtn.addEventListener("click", () => {
    page2El.classList.add("hidden");
    page1El.classList.remove("hidden");
    prevBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
});
