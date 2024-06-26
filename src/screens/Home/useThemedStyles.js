import { StyleSheet } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeStyles.colors.background,
            paddingBottom: 60,
        },
        flatListContainer: {
            height: 'auto',
            marginBottom: 10,
            paddingLeft: 20,
        },
        categoryItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: themeStyles.colors.backgroundCategory,
            borderColor: themeStyles.colors.textCategory,
            borderWidth: 1,
            borderColor: themeStyles.colors.borderCategory,
            borderRadius: 8,
            padding: 10,
            marginRight: 10,
        },
        CSelected: {
            backgroundColor: themeStyles.colors.backgroundCategorySelected,
            color: themeStyles.colors.textCategorySelected,
            borderColor: themeStyles.colors.textCategory,
        },
        categoryText: {
            color: themeStyles.colors.textCategory,
            marginLeft: 5,
            fontSize: 12,
        },
        CtSelected: {
            color: themeStyles.colors.textCategorySelected,
        },
    });

    return styles;
};
