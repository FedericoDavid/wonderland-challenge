import { Badge } from "./Badge";

interface Tab {
  id: string;
  label: string;
  isNew?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-800">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative py-4 px-1 ${
                activeTab === tab.id
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                {tab.label}
                {tab.isNew && <Badge color="yellow">NEW!</Badge>}
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
