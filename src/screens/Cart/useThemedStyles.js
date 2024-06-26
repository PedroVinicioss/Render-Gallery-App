import { StyleSheet } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
        container2: {
            flex: 1,
            backgroundColor: themeStyles.colors.background,
        },
          container: {
            height: "50%",
            backgroundColor: themeStyles.colors.background,
            paddingHorizontal: 20,
          },
          listContainer: {
            marginTop: 10,
            maxHeight: 310,
          },
          cartLine: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: themeStyles.colors.textPrimary,
            paddingVertical: 10,
            height: 100,
          },
          lineLeftArte: {
            fontSize: 16,
            fontWeight: "bold",
            color: themeStyles.colors.textPrimary,
          },
          lineLeft: {
            fontSize: 13,
            color: themeStyles.colors.textPrimary,
          },
          lineLeftPreco: {
            fontSize: 14,
            fontWeight: "bold",
            color: themeStyles.colors.textPrimary,
            marginTop: 7,
          },
          thumb: {
            width: 70,
            height: 70,
            borderRadius: 14,
            resizeMode: "cover",
          },
          header: {
            marginTop: 70,
            height: 64,
            flexDirection: "row",
            justifyContent: "space-between",
            },
            buttonIconBack: {
            width: 40,
            height: 40,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: themeStyles.colors.textPrimary,
            alignItems: "center",
            justifyContent: "center",
            left: 20,
            },
            buttonFilter: {
            width: 40,
            height: 40,
            // borderRadius: 100,
            // borderWidth: 1,
            // borderColor: themeStyles.colors.textPrimary,
            alignItems: "center",
            justifyContent: "center",
            right: 20,
            },
            infoItem: {
            flex: 1,
            marginLeft: 10,
            },
            quantityContainer: {
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingTop: 3,
            paddingBottom: 5,
            },
            quantity: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: themeStyles.colors.backgroundCategorySelected,
            borderRadius: 8,
            height: 32,
            width: 85,
            justifyContent: "space-between",
            paddingHorizontal: 5,
            },
            quantityText: {
            fontSize: 16,
            paddingHorizontal: 8,
            color: themeStyles.colors.textCategorySelected
            },
            title: {
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: themeStyles.colors.textPrimary,
            },
            buttonIcon: {
            alignItems: "center",
            justifyContent: "center",
            width: 327,
            textAlign: "center",
            backgroundColor: themeStyles.colors.button,
            margin: 10,
            height: 60,
            borderRadius: 40,
            flexDirection: "row",
            },
            nameButton: {
            fontSize: 16,
            alignItems: "center",
            justifyContent: "center",
            color:themeStyles.colors.brancoPuro,
            textAlign: "center",
            fontWeight: "bold",
            },
            buttonContainer: {
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 5,
            width: "100%",
            },
            menuIcon: {
            paddingHorizontal: 15,
            },
            emptyText: {
                color: themeStyles.colors.textPrimary
              }
    });

    return styles;
};
