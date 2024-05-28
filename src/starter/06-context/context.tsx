import {createContext, useContext, useState} from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderState = {
    theme: Theme;
    setTheme:(theme: Theme) => void;
}

type ThemeProviderProps = {
    defaultTheme?: Theme;
    children: React.ReactNode
}

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined)

export const ThemeContextProvider = ({children, defaultTheme = 'system'}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(context === undefined) throw new Error('useTheme must be used whithin the ThemeContextProvider')
    return context;
}