import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entry, EntryForm } from '@/types/Entries';

const KEY = 'diary:entries:v1';

function makeId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function read(): Promise<Entry[]> {
    try {
        const raw = await AsyncStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as Entry[]) : [];
    } catch {
        return [];
    }
}

async function write(entries: Entry[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(entries));
}

export const entriesStorage = {
    /** Новые записи — первыми */
    getAll: read,

    async add(form: EntryForm): Promise<Entry> {
        const entry: Entry = {
            ...form,
            id: makeId(),
            createdAt: new Date().toISOString(),
        };
        const all = await read();
        await write([entry, ...all]);
        return entry;
    },

    async remove(ids: string[]) {
        console.log(ids);
        const all = await read();
        await write(all.filter((e) => !ids.includes(e.id)));
    },

    async getById(id: string): Promise<Entry | undefined> {
        const all = await read();
        return all.find((item) => item.id === id) ?? undefined;
    },

    async update(id: string, form: EntryForm): Promise<void> {
        const all = await read();
        const updated = all.map((entry) =>
            entry.id === id
                ? {
                      ...entry,
                      ...form,
                  }
                : entry,
        );
        await write(updated);
    },
};
