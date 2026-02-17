#include <Arduino.h>
#include "mbedtls/base64.h"
#include "core/camera.h"

// Pinos AI Thinker
#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27
#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

bool initCamera()
{

  camera_config_t config;

  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;

  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;

  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;

  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;

  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;

  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if (psramFound())
  {
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 5;
    config.fb_count = 2;
  }
  else
  {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 5;
    config.fb_count = 1;
  }

  if (esp_camera_init(&config) != ESP_OK)
  {
    return false;
  }

  sensor_t *s = esp_camera_sensor_get();
  if (s)
  {
    s->set_whitebal(s, 1);
    s->set_awb_gain(s, 1);

    // Melhorar luz
    s->set_brightness(s, 1);
    s->set_exposure_ctrl(s, 1);
    s->set_gain_ctrl(s, 1);

    // Melhorar definição
    s->set_contrast(s, 1);
    s->set_saturation(s, 1);
    s->set_sharpness(s, 2);

    // Reduzir ruído
    s->set_denoise(s, 1);

    // Reduzir ruído
    // s->set_aec2(s, 1);
    // s->set_wb_mode(s, 4); // 0 auto, 1 sunny, 2 cloudy, 3 office, 4 home

    // Auto Exposure
    // s->set_gainceiling(s, GAINCEILING_8X); // 2X, 4X, 8X, 16X, 32X, 64X, 128X
  }

  return true;
}

camera_fb_t *getCamera()
{
  return esp_camera_fb_get();
}

String takeBase64String(camera_fb_t *fb)
{
  if (!fb || !fb->buf || fb->len == 0)
    return "";

  size_t outputLen = 0;
  mbedtls_base64_encode(NULL, 0, &outputLen, fb->buf, fb->len);

  unsigned char *encodedData = (unsigned char *)malloc(outputLen + 1);
  if (!encodedData)
    return "";

  if (mbedtls_base64_encode(encodedData, outputLen, &outputLen, fb->buf, fb->len) != 0)
  {
    free(encodedData);
    return "";
  }

  encodedData[outputLen] = '\0';
  String base64String = String((char *)encodedData);
  free(encodedData);

  return base64String;
}