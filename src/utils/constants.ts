export const DEVICE_ID_KEY = 'iot_device_id';

export const projectIdExample = "meu-dash-iot-24353";
export const urlBaseExample = `https://firestore.googleapis.com/v1/projects/${projectIdExample}/databases/(default)/`;

export const endPointTrafficLight = "/metrics/{device_id}/traffic_light/"
export const endPointSensor = "/metrics/{device_id}/sensors/"

export const trafficLightExample = `{
  "fields": {
    "mode": { "stringValue": "normal" },
    "light1": { "stringValue": "green" },
    "light2": { "stringValue": "red" },
  }
}`

export const sensorUltrasonicExample = `{
  "fields": {
    "mode": { "stringValue": "ultrasonic" },
    "value": { "integerValue": "45" },
    "count": { "integerValue": "12" },
  }
}`

export const sensorUltrasonicWithPhotoExample = `{
  "fields": {
    "mode": { "stringValue": "ultrasonic" },
    "count": { "integerValue": "13" },
    "photoUrl": { 
      "stringValue": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..." 
    }
  }
}`

export const cppCodeExample = `#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

HTTPClient http;
WiFiMulti wifiMulti;

const char* url = "${urlBaseExample}/metrics/esp32-00001/sensors/device_status";

void sendSensorData(int distance, int count) {
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    // JSON Payload formatado para Firestore
    String data = R"({
      "fields": {
        "mode": { "stringValue": "ultrasonic" },
        "value": { "integerValue": "45" },
        "count": { "integerValue": "12" }
      }
    })";
    
    // Use PATCH para atualizar apenas os campos enviados
    int httpResponseCode = http.PATCH(data);
    
    Serial.print("HTTP Code: ");
    Serial.println(httpResponseCode);
    http.end();
  }
}

void loop(){
  // Your code here
  sendSensorData(45, 1);
  delay(1000);
}
`
