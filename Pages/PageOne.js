// Home.js
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native";


const PageOne = () => {
    let navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 30}}>Welcome to Week7</Text>
            <Button title={'Add Note'}  onPress={() => navigation.navigate('PageTwo')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },


});

export default PageOne;
