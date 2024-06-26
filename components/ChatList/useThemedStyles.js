import { StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
        listContainer: {
            paddingHorizontal: 15,
            paddingBottom: 15,
        },
        chatItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        userPic: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 15,
        },
        chatDetails: {
            flex: 1,
        },
        userName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: themeStyles.colors.textPrimary,
        },
        lastMessage: {
            fontSize: 14,
            color: '#888',
        },
    });

    return styles;
};
