#ifndef SD_DRIVER_H
#define SD_DRIVER_H

#include "esp_camera.h"

bool initSD();
void savePhoto(camera_fb_t *fb);

#endif
