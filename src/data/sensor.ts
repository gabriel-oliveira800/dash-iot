export type SensorType = 'ultrasonic' | 'magnetic';

export interface SensorData {
    distance: number,
    photoUrl?: string | null,
};
