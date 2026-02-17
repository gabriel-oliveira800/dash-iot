import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useState, useEffect } from 'react';

import { auth } from './config/firebase';

import type { TrafficData } from './data/traffic';
import api from './config/api';

import { TabContent, type Tab } from './components/TabsContent';
import { TrafficHardWare } from './components/TrafficHardWare';
import { SensorHardWare } from './components/SensorHardWare';
import { Documentation } from './components/Documentation';
import { Loading } from './components/Loading';
import { Header } from './components/Header';
import type { SensorData } from './data/sensor';
import ModalDeviceId from './components/ModalDeviceId';
import { DEVICE_ID_KEY } from './utils/constants';

function App() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('traffic');

    const [deviceId, setDeviceId] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [trafficData, setTrafficData] = useState<TrafficData | null>(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                await signInAnonymously(auth);
            } catch (error) {
                console.error("Auth error:", error);
            } finally {
                setLoading(false);
            }
        };
        initAuth();

        const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) return;

        const deviceId = localStorage.getItem(DEVICE_ID_KEY);
        setDeviceId(deviceId || "");

        if (!deviceId) return console.error('Device ID not found.');

        const unsubTraffic = api.subscribeToGetData<TrafficData>({
            deviceId,
            document: 'traffic_light',
            onSuccess: (data) => setTrafficData(data),
            onError: (error) => console.error("Erro Traffic:", error)
        });

        const unsubSensor = api.subscribeToGetData<SensorData>({
            deviceId,
            document: 'sensors',
            onSuccess: (data) => setSensorData(data),
            onError: (error) => console.error("Erro Sensor:", error)
        });

        return () => {
            unsubTraffic();
            unsubSensor();
        };
    }, [deviceId, user]);


    if (loading || !user) return <Loading />;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
            <Header
                deviceId={deviceId}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                openModal={() => setModalOpen(true)}
            />

            {modalOpen && (
                <ModalDeviceId
                    isOpen={modalOpen}
                    savedDeviceId={deviceId}
                    onSave={(deviceId) => {
                        setDeviceId(deviceId);
                        setModalOpen(false);
                    }}
                    onClose={() => setModalOpen(false)}
                />
            )}

            <main className="max-w-6xl mx-auto p-4 md:p-6 pb-32">
                <TabContent
                    activeTab={activeTab}
                    items={[
                        {
                            activeTab: 'traffic',
                            component: <TrafficHardWare trafficData={trafficData} setTrafficData={setTrafficData} />
                        },
                        {
                            activeTab: 'sensor',
                            component: <SensorHardWare sensorData={sensorData} setSensorData={setSensorData} />
                        },
                        { activeTab: 'docs', component: <Documentation /> },
                    ]}
                />
            </main>
        </div>
    );
}
export { App };