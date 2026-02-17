#ifndef CAMERA_H
#define CAMERA_H

#include "esp_camera.h"

bool initCamera();
camera_fb_t *getCamera();
String takeBase64String(camera_fb_t *fb);

#endif
