export type Tab = 'traffic' | 'sensor' | 'docs';

export interface TabItem {
    activeTab: Tab;
    component: React.ReactNode;
}

interface TabContentProps {
    activeTab: Tab;
    items: TabItem[];
}

function TabContent({ activeTab, items }: TabContentProps) {
    const item = items.find(item => item.activeTab === activeTab);
    return item ? item.component : null;
}

export { TabContent };
