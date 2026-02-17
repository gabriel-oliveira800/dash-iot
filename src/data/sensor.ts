
export type SensorType = 'ultrasonic' | 'magnetic';

export interface SensorData {
    type: SensorType,
    value: number,
    count: number,
    isOpen: boolean,
    photoUrl?: string | null,
    limit: number,
};
