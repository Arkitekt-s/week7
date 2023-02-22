
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
    //delete note

    console.log(notes);
    return (
        <View style={styles.container}>
            {/*show nots and map them*/}
            {notes && notes.map(note => (
                <View key={note.id} style={styles.noteContainer}>
                    <Text style={styles.noteText}>{note.text22}</Text>
                    <Button title={'Add'} onPress={() => notesRef.add({text22: text})}
                            color={'green'}/>
                    <Button title="Edit" onPress={() => notesRef.doc(note.id).update({text22: text})} color="blue"
                    />
                    <Button title="Delete" onPress={() => notesRef.doc(note.id).delete()} color="red"
                    />
                </View>
            ))}
            {/*enter note in text box and click add to add note*/}
            <Text style={{fontSize: 30}}>Edit or add new text</Text>
           <TextInput
                value={text}
                onChangeText={setText}
                autoCapitalize={'none'}
                autoCorrect={false}
                autoFocus={true}
                placeholder="Enter text"
                containerStyle={{ padding: 10 }}
                style={styles.input}
                margin={20}
                />


            <Button title={'Go Back'} onPress={() => navigation.navigate('PageOne')}
                    color={'blue'}
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
    input: {
        height: 40,
        margin: 22,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        // make it circle edge
        borderRadius: 20,
    },
    noteContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        margin: 10,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noteText: {
        fontSize: 14,
        color: 'black',
    }


});

 export default PageTwo;
