#ifndef HELPERS_H
#define HELPERS_H

#include "Arduino.h"
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "driver/rtc_io.h"

inline void disableBrownout()
{
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
}

inline void disableFlash(int pin, int delayTime = 2000)
{
  pinMode(pin, OUTPUT);
  digitalWrite(pin, LOW);
  rtc_gpio_hold_en(GPIO_NUM_4);

  delay(delayTime);
  Serial.println("ENTRANDO EM MODO DE ESPERA");

  delay(delayTime);
  esp_deep_sleep_start();
}

#endif
