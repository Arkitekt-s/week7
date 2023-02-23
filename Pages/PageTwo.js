
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import{firestore} from '../Config/FirebaseConfig';
import {useCollectionData} from "react-firebase-hooks/firestore";


const PageTwo = () => {
    const notesRef = firestore.collection('notes');
    const[notes] = useCollectionData(notesRef, {idField: 'id'});
    let navigation = useNavigation();
    console.log(notes);

    function handleNoteClick(note) {
        console.log(note);
        navigation.navigate('PageThree', {note: note});
    }


    return (
        <View style={styles.container}>
            {/*show nots and map them*/}
            <Text style={{fontSize: 30}}>Click on Note</Text>
            {notes && notes.map(note => (
                <TouchableOpacity key={note.id} style={styles.noteContainer} onPress={() => handleNoteClick(note)}>
                    <Text style={styles.noteText}>{note.text22}</Text>
                </TouchableOpacity>
            ))}
            {/*//each list should be clickable and go to page three*/}



            <Button title={'Go Back'} onPress={() => navigation.navigate('PageOne')}
                    color={'blue'}
                    margin={10}
            />
            <Button title={'Add'} onPress={() => notesRef.add({text22: 'New Note'})}
                    color='green'
                    margin={10}
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
