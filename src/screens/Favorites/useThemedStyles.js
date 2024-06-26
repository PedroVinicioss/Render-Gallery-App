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
        height: '100%', // Define a altura para 100% para ocupar todo o espaço disponível na tela
        backgroundColor: themeStyles.colors.background,
        paddingHorizontal: 20, // Adicione um padding horizontal para espaçar o conteúdo da tela
      },
      listContainer: {
        marginTop: 10, // Adiciona um espaçamento superior para separar da parte superior da tela
        maxHeight: 625
      },
      cartLine: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1, // Alterando a largura da borda para torná-la mais visível
        borderBottomColor: "transparent", // Alterando a cor da borda
        paddingVertical: 10,
        height: 100,
      },
      lineLeftArte: {
        fontSize: 17,
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
        width: 86,
        height: 86,
        borderRadius: 14,
        resizeMode: "cover",
      },
      header: {
        marginTop: 70,
        height: 64,
        flexDirection: "row",
        justifyContent: "center",
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
      buttonFilter:{
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        right: 20,
      },
      infoItem: {
        flex: 1,
        marginLeft: 10,
      },
      quantityContainer: {
        height: '100%', 
        alignItems: "flex-end",
        justifyContent: "center",
        paddingTop: 3,
        paddingBottom: 5,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: themeStyles.colors.textPrimary
      },
      buttonIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        width:327,
        textAlign:'center',
        backgroundColor: themeStyles.colors.button,
        margin:10,
        height:60,
        borderRadius: 40,
        flexDirection: 'row',
      },
      nameButton:{
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        color:themeStyles.colors.brancoPuro,
        textAlign:'center',
        fontWeight: 'bold',
      },
      buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        bottom: 5,
        width: '100%',
      },
      separator: {
        height: 5, // Altura do separador
        backgroundColor: 'transparent', // Cor de fundo
      },
      emptyText: {
        color: themeStyles.colors.textPrimary
      }
    });

    return styles;
};
