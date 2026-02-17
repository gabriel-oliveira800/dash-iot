import { doc, onSnapshot, type Unsubscribe } from "firebase/firestore";
import { db } from "./firebase";

import type { TrafficData } from "../data/traffic";
import type { SensorData } from "../data/sensor";

type DocumentType = 'traffic_light' | 'sensors';

export interface SubscribeParams<T> {
    deviceId: string;
    document: DocumentType;
    onSuccess: (trafficData: T) => void;
    onError: (error: string) => void;
}

class Api {
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