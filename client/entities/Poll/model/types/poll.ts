export interface Poll {
    title: string;
    choices: Record<string, number>;
    expiresAt?: string;
    shareableUrl?: string;
}

export interface SelectedChoice {
    choice: string;
    selected: boolean;
}
