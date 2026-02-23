#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "core/api.h"

// Firebase
#define BASE_URL "https://firestore.googleapis.com/v1/projects/dash-iot-97222"
#define URL_SENSOR "/databases/(default)/documents/metrics/69F9-5A24-F6F5-967D/data/sensors"

static String makeRequest(HTTPClient &http, String url, String method, String body);

void connectWifi(WiFiMulti &wifiMulti, String ssid, String password)
{
    Serial.printf("CONNECTANDO NO WIFI: %s\n", ssid.c_str());
    wifiMulti.addAP(ssid.c_str(), password.c_str());

    while (wifiMulti.run() != WL_CONNECTED)
    {
        delay(1000);
        Serial.print(".");
        Serial.flush();
    }

    Serial.println("\nWIFI CONECTADO!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
}

bool isWifiConnected(WiFiMulti &wifiMulti)
{
    if (WiFi.status() == WL_CONNECTED)
    {
        return true;
    }

    wifiMulti.run();
    return WiFi.status() == WL_CONNECTED;
}

void updateSensor(HTTPClient &http, float distance) {
    http.begin(String(BASE_URL) + String(URL_SENSOR));
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<2048> doc; 

    JsonObject fields = doc.createNestedObject("fields");
    JsonObject distanceField = fields.createNestedObject("distance");
    distanceField["doubleValue"] = distance;

    String body;
    serializeJson(doc, body);

    int httpCode = http.PATCH(body);
    if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_CREATED){
        Serial.println("Dados enviado!");
    } else {
        Serial.printf("Erro: %d\n", httpCode);
    }

    http.end();
}
