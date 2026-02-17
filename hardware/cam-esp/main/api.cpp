#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include "core/api.h"

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

String makeRequest(HTTPClient &http, String url, String method, String body, std::vector<HttpHeader> headers)
{
    http.begin(url);

    // Debug import info before making the request
    Serial.println("---------------------------------------------");
    Serial.println("Nova Request");
    Serial.println("---------------------------------------------");
    Serial.printf("[%s]->%s\n", method.c_str(), url.c_str());
    Serial.printf("body: \n%s\n", body.c_str());
    Serial.println("---------------------------------------------");
    Serial.flush();

    for (auto &h : headers)
    {
        http.addHeader(h.key, h.value);
    }

    int httpCode;
    String response = "";

    if (method == "GET")
    {
        httpCode = http.GET();
    }
    else if (method == "POST")
    {
        httpCode = http.POST(body);
    }
    else if (method == "PATCH")
    {
        httpCode = http.PATCH(body);
    }
    else
    {
        Serial.println("Unsupported HTTP method");
        http.end();
        return "";
    }

    const char *headerKeys[] = {"Content-Type", "Content-Length"};
    const size_t headerKeysCount = sizeof(headerKeys) / sizeof(headerKeys[0]);
    http.collectHeaders(headerKeys, headerKeysCount);

    if (httpCode > 0)
    {
        Serial.printf("status code: %d\n", httpCode);
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_CREATED)
        {
            response = http.getString();
            Serial.printf("[RESPONSE]: %s\n", response.c_str());
            Serial.flush();
        }
        else
        {
            Serial.println("error code: " + String(httpCode));
            Serial.flush();
        }
    }
    else
    {
        Serial.printf("HTTP error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
    return response;
}

String makeRequest(HTTPClient &http, String url)
{
    return makeRequest(http, url, "GET", "", {});
}

String makeRequest(HTTPClient &http, String url, String body, String contentType)
{
    std::vector<HttpHeader> headers = {
        {"Content-Type", contentType}};
    return makeRequest(http, url, "PATCH", body, headers);
}