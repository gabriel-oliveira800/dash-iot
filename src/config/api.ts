import { doc, onSnapshot, setDoc, type Unsubscribe } from "firebase/firestore";
import { db } from "./firebase";

import type { TrafficData } from "../data/traffic";
import type { SensorData } from "../data/sensor";

type DocumentType = 'traffic_light' | 'sensors';

interface SubscribeParams<T> {
    deviceId: string;
    document: DocumentType;
    onSuccess: (trafficData: T) => void;
    onError: (error: string) => void;
}

export interface SaveDeviceIdParams {
    deviceId: string;
    onSuccess: () => void;
    onError: (error: string) => void;
}

class Api {
    async saveDeviceId({ deviceId, onSuccess, onError }: SaveDeviceIdParams) {
        try {
            await Promise.all([
                setDoc(
                    doc(db, 'metrics', deviceId, 'data', 'traffic_light'),
                    { mode: 'normal', light1: 'green', light2: 'green' }
                ),
                setDoc(
                    doc(db, 'metrics', deviceId, 'data', 'sensors'),
                    { type: 'ultrasonic', value: 0, count: 0, isOpen: false, photoUrl: null, limit: 50 }
                ),
            ]);
            onSuccess();
        } catch (error) {
            onError('Erro ao salvar o ID do dispositivo.');
        }
    }

    subscribeToGetData<T = TrafficData | SensorData>({
        deviceId,
        document,
        onSuccess,
        onError
    }: SubscribeParams<T>): Unsubscribe {
        const trafficRef = doc(db, 'metrics', deviceId, 'data', document);
        const unsubscribe = onSnapshot(
            trafficRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    onSuccess(docSnap.data() as T);
                } else {
                    onError('Dados de tráfego não encontrados.');
                }
            },
            (err) => {
                console.error('Traffic data subscription error:', err);
                onError('Erro de conexão.');
            }
        );

        return unsubscribe;
    }
}

const api = new Api();
export default api;