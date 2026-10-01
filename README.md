# 天気情報アプリ

都市名を入力すると、OpenWeather API から現在の天気を取得して表示する Web アプリです。

## 主な機能

- 都市名による天気検索（天気・気温・湿度・風速・緯度経度）
- 2ページ目で最高／最低気温・体感温度・気圧・日の出／日の入りを表示
- 天気に応じて背景画像が切り替わる

## 使用技術

- TypeScript
- HTML / Tailwind CSS
- OpenWeather API（Current Weather Data）

## ファイル構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | 画面レイアウト |
| `main.ts` | 画面操作・表示処理 |
| `WeatherInfo.ts` | 天気情報クラス |
| `Interface.ts` | API レスポンスの型定義 |
| `weatherinfo-receiver.ts` | API からのデータ取得 |
