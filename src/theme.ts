import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        loader: {
            base: string;
            highlight: string;
        };
    }
    interface PaletteOptions {
        loader: {
            base: string;
            highlight: string;
        };
    }
    interface Theme {
        palette: PaletteOptions;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        palette?: PaletteOptions;
    }
}

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#42a5f5',
            main: '#1e88e5',
            dark: '#1565c0',
            contrastText: '#fff',
        },
        secondary: {
            light: '#80d8ff',
            main: '#40c4ff',
            dark: '#00b0ff',
            contrastText: '#000',
        },
        success: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c',
            contrastText: '#fff',
        },
        error: {
            light: '#ef5350',
            main: '#e53935',
            dark: '#b71c1c',
            contrastText: '#fff',
        },
        background: {
            default: '#000',
        },
        text: {
            primary: '#000',
        },
        loader: {
            base: '#bbb',
            highlight: '#444',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#42a5f5',
            main: '#1e88e5',
            dark: '#1565c0',
            contrastText: '#fff',
        },
        secondary: {
            light: '#80d8ff',
            main: '#40c4ff',
            dark: '#00b0ff',
            contrastText: '#000',
        },
        success: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c',
            contrastText: '#000',
        },
        error: {
            light: '#ef5350',
            main: '#e53935',
            dark: '#b71c1c',
            contrastText: '#fff',
        },
        background: {
            default: '#000',
        },
        text: {
            primary: '#fff',
        },
        loader: {
            base: '#555',
            highlight: '#222',
        },
    },
});
