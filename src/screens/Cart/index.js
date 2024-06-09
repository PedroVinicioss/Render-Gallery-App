import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import PaymentMethod from "../../../components/PaymentMethod/PaymentMethod";
import { Modalize } from 'react-native-modalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getCategory } from "../../../services/CategoryService";
import { Menu, Provider as PaperProvider } from "react-native-paper"; // Importando Menu e PaperProvider
import { removeItemToCartService } from "../../../services/ProductsService";

export default function Cart() {
  const { user } = useContext(AuthContext);
  const { items, getItemsCount, getTotalPrice } = useContext(CartContext);
  const navigation = useNavigation();
  const { removeItemFromCart } = useContext(CartContext);
  const modalizeref = useRef(null);


    // Crie um array para controlar a visibilidade do menu para cada item
    const [menuVisible, setMenuVisible] = useState(Array(items.length).fill(false));

    // Função para abrir o menu para um item específico
    const openMenu = (index) => {
      setMenuVisible(menuVisible.map((value, i) => (i === index ? true : value)));
    };
  
    // Função para fechar o menu para um item específico
    const closeMenu = (index) => {
      setMenuVisible(menuVisible.map((value, i) => (i === index ? false : value)));
    };
  
  const handleRemoveProduct = (Id) => {
    console.log(Id);
    removeItemFromCart(Id);
  };
  function onOpen(event) {
    if (event) {
      event.persist();
      modalizeref.current?.open();
    }
  }

  function renderItem({ item, index }) {
    const categoriaId = item.categoria;
    const categoria = getCategory(categoriaId);
    const itemid = item.idProduto;

    return (
      <TouchableOpacity
        style={styles.cartLine}
        onPress={() => {
          navigation.navigate("Product", {
            Id: item.id,
            Name: item.nomeProduto,
            Price: item.price,
            Path: item.path,
            CategoriaId: categoria.id,
            UserId: item.artista.id,
            quantity: item.quantidade,
          });
        }}
      >
        <Image style={styles.thumb} source={{ uri: item.path }} />
        <View style={styles.infoItem}>
          <Text style={styles.lineLeftArte}>{item.nomeProduto}</Text>
          <Text style={styles.lineLeft}>{item.artista.nome}</Text>
          <Text style={styles.lineLeftPreco}>
            {item.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => openMenu(index)} style={styles.buttonIconPoint}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
          <Menu
            visible={menuVisible[index]}
            onDismiss={() => closeMenu(index)}
            anchor={
              <Ionicons
                name="ellipsis-horizontal"
                size={10}
                color="transparent"
                style={styles.menuIcon}
              />
            }
          >
            <Menu.Item onPress={() => handleRemoveProduct(itemid)} title="Remove" />
          </Menu>

          <View style={styles.quantity}>
            <TouchableOpacity
              onPress={() => {
                // Decrease quantity logic here
              }}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantidade}</Text>
            <TouchableOpacity
              onPress={() => {
                // Increase quantity logic here
              }}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container2}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonIconBack}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Carrinho</Text>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonFilter}
            >
              <Ionicons name="filter" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.listContainer}>
              <FlatList
                style={styles.itemsList}
                persistentScrollbar={true}
                contentContainerStyle={styles.itemsListContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.idProduto.toString()}
              />
            </View>
            {items.length === 0 && (
              <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
            )}
          </View>


          <Modalize ref={modalizeref} snapPoint={500}>
            <View>
            <PaymentMethod />
            <TouchableOpacity
              onPress={(event) => onOpen(event)}
              style={styles.buttonIcon}
            >
              <Text style={styles.nameButton}>Pagar</Text>
            </TouchableOpacity>
            </View>
          </Modalize>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={(event) => onOpen(event)}
              style={styles.buttonIcon}
            >
              <Text style={styles.nameButton}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    height: "50%",
    backgroundColor: "#fff",
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
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    height: 100,
  },
  lineLeftArte: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  lineLeft: {
    fontSize: 13,
    color: "#333333",
  },
  lineLeftPreco: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
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
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    left: 20,
    },
    buttonFilter: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#000000",
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
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    height: 32,
    width: 85,
    justifyContent: "space-between",
    paddingHorizontal: 5,
    },
    quantityText: {
    fontSize: 16,
    paddingHorizontal: 8,
    },
    title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    },
    buttonIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 327,
    textAlign: "center",
    backgroundColor: "#0057A8",
    margin: 10,
    height: 60,
    borderRadius: 40,
    flexDirection: "row",
    },
    nameButton: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
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
    });
