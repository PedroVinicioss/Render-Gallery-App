import { StyleSheet } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: themeStyles.colors.background,
          paddingTop: 30,
      },
      scrollView: {
          width: '100%',
      },
      coverImage: {
          width: '100%',
          height: 200,
      },
      profileSection: {
          marginTop: -50,
          flexDirection: 'row',
          marginLeft: 20,
      },
      profileImage: {
          width: 100,
          height: 100,
          borderRadius: 50,
      },
      profileName: {
          fontSize: 20,
          fontWeight: 'bold',
          color: themeStyles.colors.textPrimary,
          marginTop: 10,
        },
      postsContainer: {
          marginTop: 10,
          paddingHorizontal: 20,
      },
      postsContainer2: {
        paddingHorizontal:0,
    },
      containername: {
        paddingHorizontal: 20,
        marginTop: 5,
        alignContent: 'center',
        alignItems: 'left'
      },
      sectionTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
      },
      buttonIconBack:{
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor:themeStyles.colors.brancoPuro,
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        top: 20,
        zIndex: 2,
        left: 20,
      },
      buttonIconPoint: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: themeStyles.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        position: 'absolute',
        right: 20,  // Ajustado para 10 para que fique próximo à borda
        top: 40     // Ajustado para 30 para melhor visualização
      },
      menuContainer: {
        marginTop: 0, // Ajuste conforme necessário para o posicionamento

        },
        menuItem: {
            backgroundColor: 'white', // Fundo do menu
            margin: 0
        },
        menuText: {
            color: 'black', // Cor do texto do menu
            fontSize: 16, // Tamanho do texto
        },
      profileDesciption: {
        marginTop: 5,
        fontSize: 12,
        color: themeStyles.colors.textPrimary
      },
      containerExterno: {
        marginTop: 20,
        width: '100%',
        height: 70,
        backgroundColor: themeStyles.colors.backgroundBarraPerfil,
        flexDirection: 'row',
        flex: 1,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInterno: {
        flex: 1,
        alignItems: 'center',         
    },
    textInterno1: {
        color: themeStyles.colors.textPrimaryBarraPerfil,
        fontSize: 13,
    },
    textInterno2: {
        color: themeStyles.colors.textSecondaryBarraPerfil,
        fontSize: 14,
        fontWeight: 'bold'
    },
    publiTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themeStyles.colors.textPrimary,
        marginTop: 10,
        marginLeft: 10,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: themeStyles.colors.textPrimary,
        marginTop: 5,
        marginBottom: 10
    },
    line2: {
        width: '32.5%',
        height: 1,
        backgroundColor: themeStyles.colors.azulPrimary,
        marginLeft: 15,

    },
    space:{
        height: 40,
    },
    spaceheader:{
        height: 100,
    },
    infoArt3: {
        flex: 1, // Faz com que cada infoArt2 ocupe igualmente o espaço disponível
        marginTop: 5,
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
      },
      category: {
        backgroundColor: themeStyles.colors.backgroundCategorySelected,
        color: themeStyles.colors.textCategorySelected,
        borderColor: themeStyles.colors.textCategory,
        borderRadius: 8,
        marginTop: 3,
        padding: 5,
        marginRight: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent:  'center',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    CSelected: {
      textAlign: 'center',
      color: themeStyles.colors.textCategorySelected
    },
    profileName2: {
        color: themeStyles.colors.textSecondary,
        paddingTop: 10,
        fontSize: 12
    },
    modal: {
        backgroundColor: themeStyles.colors.background, // Cor de fundo do modal
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        elevation: 999, // Elevação para aparecer acima do TabNavigatorBottom
        zIndex: 999, // Z-index para aparecer acima do TabNavigatorBottom
    },
    buttonSair: {
        backgroundColor: themeStyles.colors.buttonSair, // Cor de fundo do botão
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    nameButton: {
        color: themeStyles.colors.textPrimaryButton, // Cor do texto do botão
        fontSize: 20, // Tamanho do texto do botão
        fontStyle: 'Bold'
    },
    });

    return styles;
};
