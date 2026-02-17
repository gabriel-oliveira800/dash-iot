#include <Arduino.h>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

#include "core/camera.h"
#include "drivers/sd.h"
#include "utils/helpers.h"
#include "core/api.h"

#define EEPROM_SIZE 1

// WiFi Config
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

// Firebase URLs
#define BASE_URL "https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)"
#define URL_SENSOR_TOGGLE "/documents/metrics/{device_id}/data/sensors"

HTTPClient http;
WiFiMulti wifiMulti;
bool isMakingRequest = false;

camera_fb_t *fb = NULL;
bool takePhotoButtonPressed = false;

void setup() {
  Serial.begin(115200);
  connectWifi(wifiMulti, WIFI_SSID, WIFI_PASSWORD);
  disableBrownout();
  handleInitCamera();
}

void handleInitCamera() {
  if (!initCamera()) {
    Serial.println("ERRO AO INCIAR CAMERA");
    return;
  }

  if (!initSD()) {
    Serial.println("ERROR AO INICIAR AO SD CARD");
    return;
  }

  fb = getCamera();
  Serial.println("CAMERA PRONTA PARA SER USADA");
}

void takePhoto() {
  String base64String = takeBase64String(fb);
  disableFlash(4);
  takePhotoButtonPressed = false;
}

void toggleMagneticSensor(bool isOpen) {
  String data = "";
  if(isOpen) {
    data = R"({
    "fields": {
      "type": { "stringValue": "magnetic" },
      "isOpen": { "booleanValue": "true" }
    }
  })";
  } else {
    data = R"({
    "fields": {
      "type": { "stringValue": "magnetic" },
      "isOpen": { "booleanValue": "false" }
    }
  })";
  }

  
  String ulr = String(BASE_URL) + String(URL_SENSOR_TOGGLE);
  makeRequest(http, ulr, data, "application/json");
}


void loop() {
  if (isWifiConnected(wifiMulti) == false) {
    Serial.println("WiFi NÃO CONECTADO!");
    return;
  }

  delay(2000);
  toggleMagneticSensor(false);
  delay(2000);
  toggleMagneticSensor(true);
}