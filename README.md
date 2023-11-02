# Weather App

A simple weather app displaying the weather at your location made in Plain JS.


## Demo

https://kevin-ha-kha.github.io/weather-app/


## API Reference

### Get item

```http
  GET http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `latitude`      | `number` | **Required**. User's latitude |
| `longitude`      | `number` | **Required**. User's longitude |
| `key`      | `string` | **Required**.  |

