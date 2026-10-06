export type Colors = {
    headerGradient: readonly [string, string];
    buttonGradient: readonly [string, string, string, string];
    sheet: string; // фон белой «шторки»
    text: string;
    textSecondary: string;
    placeholder: string;
    border: string; // рамки элементов списка и карточек
    borderStrong: string; // рамки полей ввода
    card: string; // фон блока «Пример»
    accent: string; // заголовки и иконки на шторке
    badge: string; // кружок с буквой СМЭР
    iconButtonBg: string; // круглые кнопки в шапке
    iconButtonIcon: string;
};

export const lightColors: Colors = {
    headerGradient: ['#00004F', '#05055F'],
    buttonGradient: ['#02024F', '#0A0A78', '#2B2BB0', '#8A3FD0'],
    sheet: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    placeholder: '#8A8A8A',
    border: '#BDBDBD',
    borderStrong: '#777777',
    card: '#F2F2F7',
    accent: '#02024F',
    badge: '#02024F',
    iconButtonBg: '#FFFFFF',
    iconButtonIcon: '#02024F',
};

export const darkColors: Colors = {
    headerGradient: ['#000020', '#02023A'],
    buttonGradient: ['#1B1B9A', '#2B2BC0', '#4A3FE0', '#9B4FE0'],
    sheet: '#121212',
    text: '#F2F2F7',
    textSecondary: '#A0A0A8',
    placeholder: '#7A7A82',
    border: '#3A3A40',
    borderStrong: '#55555C',
    card: '#1E1E24',
    accent: '#A5A5FF',
    badge: '#2B2BB0',
    iconButtonBg: '#26263A',
    iconButtonIcon: '#FFFFFF',
};
