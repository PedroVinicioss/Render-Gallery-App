import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useThemedStyles } from "./useThemedStyles";
import { AuthContext } from "../../../context/AuthContext";
import { Posts } from '../../../components/Posts';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from "../../../ThemeContext";


export default function MyProfile({ route }) {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = useThemedStyles();
  const [menuVisible, setMenuVisible] = useState(true);
  const modalizeref = useRef(null);
  const { themeStyles } = useTheme();

  // Função para lidar com o logout
  const handleLogout = () => {
    signOut();
    navigation.navigate("Login");
  };

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        position: "absolute",
        backgroundColor: themeStyles.colors.preto,
        borderTopWidth: 0,
        bottom: 14,
        left: 14,
        right: 14,
        elevation: 0,
        borderRadius: 40,
        height: 60,
        display: menuVisible ? "flex" : "none",
      },
    });
  }, [navigation, menuVisible]);

  const onOpen = () => {
    setMenuVisible(false);
    modalizeref.current?.open();
  };

  if (!user) {
    handleLogout();
    return (
      <View style={styles.container}>
        <Text>Deslogando...</Text>
      </View>
    );
  }

  const path = user.pic;
  const { publicacoes } = user;
  const qtdProducts = publicacoes.length;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Modalize
          ref={modalizeref}
          snapPoint={100}
          modalStyle={styles.modal}
          onClosed={() => setMenuVisible(true)}
          // modalHeight={100}
          adjustToContentHeight={true}
          openAnimationConfig={{ timing: { duration: 350 } }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={handleLogout} style={styles.buttonSair}>
            <Text style={styles.nameButton}>Sair</Text>
          </TouchableOpacity>
          </View>
        </Modalize>

        <ScrollView style={styles.scrollView}>
          <View style={styles.spaceheader}></View>

          <TouchableOpacity onPress={onOpen} style={styles.buttonIconPoint}>
            <Ionicons name="ellipsis-horizontal" size={24} color={themeStyles.colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.profileSection}>
            <Image
              source={{ uri: path }}
              style={styles.profileImage}
            />
            <View style={styles.containername}>
              <Text style={styles.profileName}>@{user.name}</Text>
              <Text style={styles.profileName2}>Usuário desde 01/01/1999</Text>
              <View style={styles.infoArt3}>
                <View style={styles.category}>
                  <Text style={styles.CSelected}>Animes</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.postsContainer}>
            <View style={styles.containerExterno}>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Artes</Text>
                <Text style={styles.textInterno2}>{qtdProducts}</Text>
              </View>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Likes</Text>
                <Text style={styles.textInterno2}>50</Text>
              </View>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Views</Text>
                <Text style={styles.textInterno2}>100</Text>
              </View>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Vendas</Text>
                <Text style={styles.textInterno2}>11</Text>
              </View>
            </View>
            <Text style={styles.publiTitle}>Publicações</Text>
            <View style={styles.line}>
              <View style={styles.line2}></View>
            </View>
          </View>

          <View style={styles.postsContainer2}>

            <Posts Products={publicacoes} returnScreen={'MyProfile'} />
          </View>

        </ScrollView>
        <View style={styles.space}></View>
      </View>
    </GestureHandlerRootView>
  );
}
