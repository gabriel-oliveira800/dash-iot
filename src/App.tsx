import { signInAnonymously } from 'firebase/auth';
import { useState, useEffect } from 'react';

import { auth } from './config/firebase';

import { TabContent, type Tab } from './components/TabsContent';
import { TrafficHardWare } from './components/TrafficHardWare';
import { SensorHardWare } from './components/SensorHardWare';
import { Documentation } from './components/Documentation';
import { Loading } from './components/Loading';
import { Header } from './components/Header';

function App() {
    const [activeTab, setActiveTab] = useState<Tab>('traffic');
    const [loading, setLoading] = useState(true);

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
    }, []);


    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="max-w-6xl mx-auto p-4 md:p-6 pb-32">

                <TabContent
                    activeTab={activeTab}
                    items={[
                        { activeTab: 'traffic', component: <TrafficHardWare /> },
                        { activeTab: 'sensor', component: <SensorHardWare /> },
                        { activeTab: 'docs', component: <Documentation /> },
                    ]}
                />
            </main>
        </div>
    );
}
export { App };