export const appIdExample = "1:61292325476712:web:5ac3896d9a5ee55e31c0bd";
export const urlBaseExample = "https://firestore.googleapis.com/v1/projects/{YOUR_PROJECT_ID}/databases/(default)/";

export const endPointTrafficLight = "/metrics/{device_id}/traffic_light/device_status"
export const endPointSensor = "/metrics/{device_id}/sensors/device_status"

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

export const cppCodeExample = `#include <HTTPClient.h>

const char* serverName = "${urlBaseExample}/metrics/esp32-00001/sensors/device_status";

void sendSensorData(int distance, int count) {
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    
    // JSON Payload formatado para Firestore
    String json = "{ \\"fields\\": { \\"value\\": { \\"integerValue\\": \\"" + String(distance) + "\\" }, \\"count\\": { \\"integerValue\\": \\"" + String(count) + "\\" } } }";
    
    // Use PATCH para atualizar apenas os campos enviados
    int httpResponseCode = http.PATCH(json);
    
    Serial.print("HTTP Code: ");
    Serial.println(httpResponseCode);
    http.end();
  }
}`
