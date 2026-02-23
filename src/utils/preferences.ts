export type PreferenceKey = '@app:limit' | '@app:qntPeople'

function getSavedData<T>(key: PreferenceKey, defaultValue: T): T {
    const storedValue = localStorage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);
    return defaultValue;
}

function saveData<T>(key: PreferenceKey, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}

export { getSavedData, saveData };
