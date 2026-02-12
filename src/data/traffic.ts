export type TrafficLight = 'green' | 'yellow' | 'red';

export interface TrafficData {
    lastUpdate: Date,
    mode: 'normal' | 'error'
    light1: TrafficLight
    light2: TrafficLight
};
