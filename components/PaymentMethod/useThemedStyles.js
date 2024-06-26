import { StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({

    });

    return styles;
};
