#include <Arduino.h>

#define SOUND_SPEED 0.034
#define MIN_DISTANCE_IN_CM 50.0
#define TRIG 14
#define ECHO 15

static void clearAll();
static void emitPulse();

void setupUltrasonic(){
    pinMode(TRIG, OUTPUT);
    pinMode(ECHO, INPUT);
}

int readDistance(){
    clearAll();

    emitPulse();
    long duration = pulseIn(ECHO, HIGH);
    return (duration * SOUND_SPEED) / 2;
}

static void emitPulse(){
    digitalWrite(TRIG, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG, LOW);
}

static void clearAll(){
    digitalWrite(TRIG, LOW);
    delayMicroseconds(2);
}