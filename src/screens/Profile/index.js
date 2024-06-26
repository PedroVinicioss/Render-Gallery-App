import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from './useThemedStyles';
// import { getProductsByUser } from '../../../services/ProductsService';
import { PostRelated } from '../../../components/Post/PostRelated';
import { useState } from 'react';
import { getUsersById } from '../../../services/UsersService';
import { API_BASE_URL } from '../../../env.js';
import { Posts } from '../../../components/Posts';
import { useTheme } from '../../../ThemeContext';

const urlApi = API_BASE_URL;

export default function Profile({route}) {
    let [count, setCount] = useState(0);
    const navigation = useNavigation();
    const styles = useThemedStyles(); 
    const { userId, name, path, publicacoes, publicacaoId, publicacaoName, publicacaoPrice, publicacaoPath, publicacaoUserId, publicacaoCategoriaId, publicacaoQuantidade } = route.params;
    const qtdProducts = publicacoes.length;
    const { themeStyles } = useTheme();

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <View style={styles.spaceheader}></View>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Product', { Id: publicacaoId, Name: publicacaoName, Price: publicacaoPrice, Path: publicacaoPath, UserId: publicacaoUserId, CategoriaId: publicacaoCategoriaId, quantity:publicacaoQuantidade })}  style={styles.buttonIconBack}>
                    <Ionicons  name="chevron-back" size={24} color={themeStyles.colors.textPrimary} />
                </TouchableOpacity> */}

                <View style={styles.profileSection}>
                    <Image
                    source={{ uri: path }}
                    style={styles.profileImage}
                    />
                    <View style={styles.containername}>
                    <Text style={styles.profileName}>@{name}</Text>
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

                    {/* <ScrollView horizontal>
                        {publicacoes.map((relatedProduct, index) => (
                            <PostRelated
                                key={relatedProduct.id}
                                id={relatedProduct.id}
                                name={relatedProduct.name}
                                path={relatedProduct.path}
                                price={relatedProduct.price}
                                user={relatedProduct.user}
                                style={styles.relatedItem}
                            />
                            ))}
                    </ScrollView> */}
                    <Posts  Products={publicacoes} />
                </View>
            </ScrollView>
            <View style={styles.space}></View>

        </View>
    );
}

