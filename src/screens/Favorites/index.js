import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavContext } from '../../../context/FavContext';
import { Ionicons } from "@expo/vector-icons";
import { getCategory } from '../../../services/CategoryService';
import { addItemToFavService } from '../../../services/ProductsService'; // Renomeado para evitar conflito de nomes
import { useThemedStyles } from "./useThemedStyles";
import { useTheme } from "../../../ThemeContext";

export default function Favorites() {
  const { items, addItemToFav } = useContext(FavContext); // Alterado para usar addItemToFav diretamente do contexto
  const navigation = useNavigation();
  const styles = useThemedStyles(); 
  const { themeStyles } = useTheme();

  function onAddToFav(id) {
    addItemToFav(id);
  }

  function renderItem({ item }) {
    const categoriaId = item.categoria;
    const categoria = getCategory(categoriaId);
    return (
      <TouchableOpacity
        style={styles.cartLine}
        onPress={() => {
          navigation.navigate("Product", {
            Id: item.id,
            Name: item.name,
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
          <Text style={styles.lineLeftArte}>{item.name}</Text>
          <Text style={styles.lineLeft}>{item.artista ? item.artista.nome : ''}</Text>
          <Text style={styles.lineLeftPreco}>
            {categoria ? categoria.name : ''}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity         
            onPress={() => {
              onAddToFav(item.id);
            }} style={styles.buttonIconFav}>
            <Ionicons name="heart" size={26} color={themeStyles.colors.vermelho} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container2}>
      <View style={styles.header}>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonIconBack}
        >
          <Ionicons name="chevron-back" size={24} color={themeStyles.colors.textPrimary} />
        </TouchableOpacity> */}

        <Text style={styles.title}>Favorites</Text>

        {/* <View style={styles.buttonFilter}>
          <Ionicons name="options" size={24} color={themeStyles.colors.textPrimary} />
        </View> */}
      </View>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.itemsList}
            contentContainerStyle={styles.itemsListContainer}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
        {items.length === 0 && (
          <Text style={styles.emptyText}>Você não possui Favoritos.</Text>
        )}
      </View>            
    </View>
  );
}
