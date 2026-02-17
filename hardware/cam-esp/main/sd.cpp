#include <Arduino.h>
#include "FS.h"
#include "SD_MMC.h"
#include <EEPROM.h>
#include "drivers/sd.h"

#define EEPROM_SIZE 1

bool initSD()
{
  if (!SD_MMC.begin())
  {
    Serial.println("SD Card montado com falha");
    return false;
  }

  if (SD_MMC.cardType() == CARD_NONE)
  {
    Serial.println("Nenhum cartão SD conectado");
    return false;
  }

  return true;
}

void savePhoto(camera_fb_t *fb)
{
  EEPROM.begin(EEPROM_SIZE);
  int pictureId = EEPROM.read(0) + 1;
  String path = "/picture" + String(pictureId) + ".jpg";

  File file = SD_MMC.open(path.c_str(), FILE_WRITE);

  if (file)
  {
    file.write(fb->buf, fb->len);
    EEPROM.write(0, pictureId);
    EEPROM.commit();
    file.close();
    Serial.println("Arquivo salvo: " + path);
  }
  else
  {
    Serial.println("Erro ao abrir o arquivo em modo de escrita");
  }

  esp_camera_fb_return(fb);
}
