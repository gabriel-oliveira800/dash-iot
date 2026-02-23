#ifndef CONTROL_WIFI_H
#define CONTROL_WIFI_H

#include <vector>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define DEFAULT_LIMIT_DISTANCE 10.0

bool isWifiConnected(WiFiMulti &wifiMulti);
void connectWifi(WiFiMulti &client, String ssid, String password);
void updateSensor(HTTPClient &http, float distance);
#endif