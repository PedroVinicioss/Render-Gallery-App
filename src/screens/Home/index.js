import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Ionicons } from '@expo/vector-icons';
import { getCategories } from "../../../services/CategoryService";
import { Posts } from "../../../components/Posts";
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from "./useThemedStyles";
import { getProducts, filterProducts} from '../../../services/ProductsService';


export default function Home({route}) {
    const styles = useThemedStyles();

    const [products, setProducts] = useState([]);
    const categories = getCategories();
    const navigation = useNavigation();
    const CategoryId = route.params.CategoryId;
    const searchText = route.params.name;
    const [visibilityC, setVisibility] = useState(false);
    const [text, setText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(CategoryId); 

    const handleTextChange = (searchText) => {
        setText(searchText);
        if (searchText === '') {
            fetchProducts(selectedCategory, '');
        } else {
            fetchProducts(selectedCategory, searchText); 
        }
    };

    useEffect(() => {
        fetchProducts(selectedCategory, searchText); 

        // Chamada inicial e posteriormente a cada 10 segundos
        const intervalId = setInterval(() => {
            fetchProducts(selectedCategory, searchText);
        }, 10000);

        // Limpando o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, []);

    async function fetchProducts(categoryId, searchText) {
        try {
            const productsData = await getProducts(categoryId, searchText);
            // console.log('Resultado da busca da API:', productsData);
            setProducts(productsData);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    const handleFilterPress = (visibility) => {
        setVisibility(visibility);
    };

    const renderCategoryItem = ({ item }) => {
        const isSelectedCategory = selectedCategory === item.id;

        return(
            <TouchableOpacity  onPress={() => {
                setSelectedCategory(item.id);
                fetchProducts(item.id, text);
            }} 
            style={[styles.categoryItem, isSelectedCategory ? styles.CSelected : null]}>
                <Ionicons style={[styles.categoryText,isSelectedCategory ? styles.CtSelected : null]} name={item.icon} size={15} color="#fff" />
                <Text style={[styles.categoryText,isSelectedCategory ? styles.CtSelected : null]}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}> 
            <SearchBar onTextChange={handleTextChange} onFilterPress={handleFilterPress}/>
            <View style={[styles.flatListContainer,{ display: visibilityC ? 'flex' : 'none' }]}>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <Posts  Products={products} searchText={searchText} />
        </View>
    );
}
