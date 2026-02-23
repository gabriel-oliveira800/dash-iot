#include <Arduino.h>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

#include "core/camera.h"
#include "drivers/sd.h"
#include "utils/helpers.h"
#include "core/ultrasonic.h"
#include "core/api.h"

#define EEPROM_SIZE 1

// WiFi Config
#define WIFI_SSID "Sitio Bom Sossego 2.4G"
#define WIFI_PASSWORD "sitiobomsossego1096"

HTTPClient http;
WiFiMulti wifiMulti;

camera_fb_t *fb = NULL;

void setup() {
  Serial.begin(115200);
  connectWifi(wifiMulti, WIFI_SSID, WIFI_PASSWORD);
  setupUltrasonic();

  // disableBrownout();
  // handleInitCamera();
}

void handleInitCamera() {
  if (!initCamera()) {
    Serial.println("ERRO AO INCIAR CAMERA");
    return;
  }

  fb = getCamera();
  Serial.println("CAMERA PRONTA PARA SER USADA");
}

void loop() {
  if (isWifiConnected(wifiMulti) == false) {
    Serial.println("WiFi NÃO CONECTADO!");
    return;
  }

  float distance = readDistance();
  Serial.println("Distancia: " + String(distance) + " cm");
  delay(1000);

  updateSensor(http, distance);
}

