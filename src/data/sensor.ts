
export type SensorType = 'ultrasonic' | 'magnetic';

export interface SensorData {
    lastUpdate: Date,
    type: SensorType,
    value: number,
    count: number,
    isOpen: boolean,
    limit: number,
};
