#ifndef CONTROL_WIFI_H
#define CONTROL_WIFI_H

#include <vector>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

struct HttpHeader {
    String key;
    String value;
};

bool isWifiConnected(WiFiMulti &wifiMulti);
void connectWifi(WiFiMulti &client, String ssid, String password);

String makeRequest(
    HTTPClient &http,
    String url,
    String method,
    String body,
    std::vector<HttpHeader> headers
);
String makeRequest(HTTPClient &http, String url);
String makeRequest(HTTPClient &http, String url, String body, String contentType);

String toggleMagneticSensor(HTTPClient &http, bool isOpen);

#endif