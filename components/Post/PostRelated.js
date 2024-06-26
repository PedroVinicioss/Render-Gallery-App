import React, { useEffect, useState, useContext } from "react";
import { useToast } from "react-native-toast-notifications";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { getUsersById } from "../../services/UsersService";
import { useNavigation } from '@react-navigation/native';
import { FavContext } from '../../context/FavContext';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../context/AuthContext";
import { useThemedStyles } from "./PostRelatedStyles";


export function PostRelated({ id, name, userId, price, path, height, width, categoriaId, quantidade }) {
    const styles = useThemedStyles(); 
    
    const toast = useToast();
    const { getFavItem, addItemToFav } = useContext(FavContext);
    const [aspectRatio, setAspectRatio] = useState(1);
    let [icon, setIcon] = useState('heart-outline');
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const isCurrentUser = user.id === userId;
    useEffect(() => {
        if (!height || !width) {  // Se height ou width não forem fornecidos
            Image.getSize(path, (w, h) => {
                setAspectRatio(w / h);
            });
        }
    }, [path]);

    const updateIcon = () => {
        const favItem = getFavItem(id);
        setIcon(favItem ? 'heart' : 'heart-outline');
    };

    useEffect(() => {
        updateIcon();
        return navigation.addListener('focus', () => {
            updateIcon();
        });
    }, [navigation, id, getFavItem]);

    function onAddToFav() {
        addItemToFav(id);
        if (!getFavItem(id)) {
            toast.show("Arte Favoritada com sucesso!", {
                type: "warning",
                placement: "bottom",
                duration: 2000,
                offset: 30,
                animationType: "fade",
                textStyle: { color: 'white' },
                backgroundColor: "#FF5722",
                icon: <Ionicons name="heart-outline" size={24} color="white" />,
            });
            setIcon('heart');
        } else {
            setIcon('heart-outline');
        }
    }

    const truncatedName = name.length > 10 ? name.slice(0, 12) + '...' : name;

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Product', { Id: id, Name: name, Price: price, Path: path, UserId: userId, CategoriaId: categoriaId, quantity:quantidade })}>
            <Image source={{ uri: path }} style={styles.image } />
            

            <View style={styles.footer}>
                <Text style={styles.title}>{truncatedName}</Text>
                {isCurrentUser ? null : (
                    <>
                    <TouchableOpacity onPress={() => onAddToFav() }  style={styles.buttonIconFav}>
                        <Ionicons name={icon} size={24} color="#F13658" />
                    </TouchableOpacity>
                    </>
                )}
            </View>
            {/* <View style={styles.infoContainer}>
                <Text style={styles.user}><Ionicons name="person-outline" style={styles.person} /> {user2.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                    <View style={styles.ratingContainer}>
                        <MaterialIcons name="thumb-up" style={styles.like} />
                        <AntDesign name="like1" style={styles.like} />
                        <FontAwesomeIcon icon={faThumbsUp} style={styles.like} />
                        <Text style={styles.rating}>5</Text>
                    </View>
                </View>
            </View> */}
        </TouchableOpacity>
    );
}
