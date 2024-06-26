import React, { useEffect, useState, useContext, useRef } from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation, useFocusEffect } from "@react-navigation/native";
import { CartContext } from "../../context/CartContext";
import { FavContext } from "../../context/FavContext";
import { ToastProvider } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Favorites from "../screens/Favorites";
import MyProfile from "../screens/MyProfile";
import Product from "../screens/Product";
import Chat from "../screens/Chat";
import { useTheme } from "../../ThemeContext";
import darkMode from "../../assets/System/dark-mode.png";
import lightMode from "../../assets/System/light-mode.png";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import Signup from "../screens/Signup";
import { AuthContext } from '../../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import { API_BASE_URL } from '../../env.js';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChatList from "../../components/ChatList/ChatList";

const urlApi = API_BASE_URL;

const Tab = createBottomTabNavigator();
const BackButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    }}
  >
    <Ionicons name="chevron-back" size={24} color="white" />
  </TouchableOpacity>
);

function Routes({ connection, isConnected }) {
  const { user, loading, signIn } = useContext(AuthContext);
  const { getItemsCount } = useContext(CartContext);
  const { getFavCount } = useContext(FavContext);
  const navigation = useNavigation();
  const { theme, toggleTheme, themeStyles } = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [timer, setTimer] = useState(null); // Estado para armazenar o temporizador
  const modalizeref = useRef(null);

  const chats = user ? user.chats : [];
  let imageSource = theme === "dark" ? darkMode : lightMode;

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        if (!loading) {
          setAppIsReady(true);
        }
      }
    }

    prepare();
  }, [loading]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchUserInfo() {
        try {
          if (user && user.id) {
            const response = await axios.post(`${urlApi}/api/mobile/UserInfoAll`, { Id: user.id });
            signIn(response.data);
          }
        } catch (error) {
          if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data));
          } else if (error.request) {
            throw new Error('Erro de rede: não foi possível conectar ao servidor');
          } else {
            throw new Error('Erro ao enviar solicitação');
          }
        }
      }

      if (appIsReady) {
        const intervalId = setInterval(fetchUserInfo, 5000);
        setTimer(intervalId);
      }
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }, [appIsReady, user, signIn])
  );

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  if (!appIsReady) {
    return null;
  }

  const onOpen = () => {
    modalizeref.current?.open();
  };

  const onCloseModalize = () => {
    modalizeref.current?.close();
  };

  const navigateToChat = (item) => {
    onCloseModalize(); // Fechar o Modalize antes de navegar para o chat
    navigation.navigate('Chat', { user_chat: item.user_chat, chat_id: item.chat_id, messages_chat: item.messages, connection, isConnected });
  };

  return (
    <ToastProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName={user ? "Home" : "Login"}
          screenOptions={({ route }) => ({
            headerTintColor: themeStyles.colors.textPrimary,
            headerStatusBarHeight: 30,
            headerStyle: {
              backgroundColor: themeStyles.colors.background,
              borderWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            animationEnabled: true,
            animationTypeForReplace: "fade",
            animationIn: "slideInDown",
            animationOut: "slideOutUp",
            tabBarVisible: route.name !== "Product",
            tabBarShowLabel: true,
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
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            initialParams={{ CategoryId: 0, name: "" }}
            options={{
              headerTitle: () => (
                <Image
                  source={require("../../assets/System/logo.png")}
                  style={{ width: 120, height: 40 }}
                />
              ),
              headerRight: () => (
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <TouchableOpacity onPress={onOpen} style={{marginRight: 15}}>
                    <Ionicons name="chatbubble-ellipses" size={30} color={themeStyles.colors.textCategory} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={toggleTheme}
                    style={{ marginRight: 15 }}
                  >
                    <Image
                      source={imageSource}
                      style={{ width: 60, height: 35 }}
                    />
                  </TouchableOpacity>
                </View>
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require("../../assets/System/home-active.png")
                      : require("../../assets/System/home-inactive.png")
                  }
                  style={{ width: 40, height: 40 }}
                />
              ),
              tabBarLabel: ({ focused }) => null,
            }}
          />
          <Tab.Screen
            name="Carrinho"
            component={Cart}
            options={{
              header: () => null,
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require("../../assets/System/cart-active.png")
                      : require("../../assets/System/cart-inactive.png")
                  }
                  style={{ width: 40, height: 40 }}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    top: 30,
                    left: 30,
                    backgroundColor: themeStyles.colors.vermelho,
                    borderRadius: 50,
                    position: "absolute",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginRight: 1,
                      top: -1,
                      fontSize: 10,
                      fontWeight: "500",
                      color: themeStyles.colors.brancoPuro,
                    }}
                  >
                    {getItemsCount()}
                  </Text>
                </View>
              ),
              tabBarVisible: false,
              tabBarStyle: { display: "none" },
            }}
          />
          <Tab.Screen
            name="Favoritos"
            component={Favorites}
            options={{
              header: () => null,
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require("../../assets/System/heart-active.png")
                      : require("../../assets/System/heart-inactive.png")
                  }
                  style={{ width: 40, height: 40 }}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    top: 30,
                    left: 30,
                    backgroundColor: themeStyles.colors.vermelho,
                    borderRadius: 50,
                    position: "absolute",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginRight: 1,
                      top: -1,
                      fontSize: 10,
                      fontWeight: "500",
                      color: themeStyles.colors.brancoPuro,
                    }}
                  >
                    {getFavCount()}
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="MyProfile"
            component={MyProfile}
            options={{
              header: () => null,
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require("../../assets/System/profile-active.png")
                      : require("../../assets/System/profile-inactive.png")
                  }
                  style={{ width: 40, height: 40 }}
                />
              ),
              tabBarLabel: ({ focused }) => null,
            }}
          />
          <Tab.Screen
            name="Product"
            component={Product}
            options={{
              tabBarButton: () => null,
              tabBarVisible: false,
              tabBarStyle: { display: "none" },
              header: () => null,
              unmountOnBlur: true,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarButton: () => null,
              tabBarVisible: false,
              header: () => null,
              unmountOnBlur: true,
            }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{ tabBarVisible: false, headerShown: false, tabBarButton: () => null, tabBarVisible: false, tabBarStyle: { display: "none"}}}
          />
          <Tab.Screen
            name="Signup"
            component={Signup}
            options={{ tabBarVisible: false, headerShown: false, tabBarButton: () => null, tabBarVisible: false, tabBarStyle: { display: "none"}}}
          />
          <Tab.Screen
            name="Chat"
            component={Chat}
            options={{ tabBarVisible: false, headerShown: false, tabBarButton: () => null, tabBarVisible: false, tabBarStyle: { display: "none"}}}
            initialParams={{ connection, isConnected }}
          />
        </Tab.Navigator>
        <Modalize
          ref={modalizeref}
          snapPoint={750}
          adjustToContentHeight={true}
          openAnimationConfig={{ timing: { duration: 500 } }}
          modalStyle={{backgroundColor: themeStyles.colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20}}
        >
          <View style={{height: 750 }}>
            <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: themeStyles.colors.textPrimary, marginTop: 20}}>Conversas</Text>
            <ChatList
              chats={chats}
              onPressChatItem={navigateToChat} 
            />
          </View>
        </Modalize> 
      </GestureHandlerRootView>
    </ToastProvider>
  );
}

export default Routes;
