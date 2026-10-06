export type EntryForm = {
    situation: string;
    thoughts: string;
    emotions: string;
    reactions: string;
    createdAt: string
};

export type Entry = EntryForm & {
    id: string;
};
