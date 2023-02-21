// About.js
import React, { useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import{firestore} from '../Config/FirebaseConfig';
import {useCollectionData} from "react-firebase-hooks/firestore";


const PageTwo = () => {
    const notesRef = firestore.collection('notes');
    const[notes] = useCollectionData(notesRef, {idField: 'id'});
    let navigation = useNavigation();
    const [text, setText] = useState('');

    console.log(notes);
    return (
        <View style={styles.container}>
            {/*show nots and map them*/}
            {notes && notes.map(note => <Text key={note.id}>{note.text22}</Text>)}
            <Text>Enter a note</Text>
           <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Enter text"
                containerStyle={{ padding: 10 }}
                style={{ height: 40, borderColor: 'black', borderWidth: 2 }}
                margin={20}
                />

            <Button title={'Add'} onPress={() => notesRef.add({text22: text})}
                    color={'green'}
                    margin={20}
            />


            <Button title={'Go to Home'} onPress={() => navigation.navigate('PageOne')}
                    color={'red'}
                    margin={20}
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

export default PageTwo;
