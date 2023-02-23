
import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import{firestore,storage} from '../Config/FirebaseConfig';
import {useCollectionData} from "react-firebase-hooks/firestore";
import * as ImagePicker from 'expo-image-picker';


const PageThree = () => {
    const notesRef = firestore.collection('notes');
    const[notes] = useCollectionData(notesRef, {idField: 'id'});
    let navigation = useNavigation();
    const [text, setText] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);
    const [image, setImage] = useState(null);


     const pickImage = useCallback(async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
         // pick image in a local device
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
         if (!result.canceled) {
             const { uri } = result.assets[0];
             console.log(uri);
             setImage(uri);
        }
    }, []);
//image preview
    var imagePreview = null;
    if (image) {
        imagePreview = <Image source={{uri: image}} style={{width: 200, height: 200}}/>
    }
    else {
        imagePreview = <Text>No image picked</Text>
    }
    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = storage.ref().child(`images/${Date.now()}`);
        return ref.put(blob);

    }
    //upload image to firebase storage
    const handleUpload = () => {
        uploadImage(image).then(() => {
            alert('Image has been uploaded!');
        });
    }

const handleNoteClick = (note) => {
        setSelectedNote(note);
        setText(note.text22);
};
const handleEdit = () => {
        notesRef.doc(selectedNote.id).update({text22: text});
        setSelectedNote(null);
        setText('');
}
const handleDelete = () => {
        notesRef.doc(selectedNote.id).delete();
        setSelectedNote(null);
        setText('');
}



    return (
        <View style={styles.container}>
            {/*show nots and map them*/}
            <Text style={{fontSize: 20}}>Edit or add new text</Text>


            {/* Show all notes */}
            {notes && notes.map(note => (
                <TouchableOpacity key={note.id} onPress={() => handleNoteClick(note)}>
                    <View style={styles.noteContainer}>
                        <Text style={styles.noteText}>{note.text22}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            {/* Show selected note */}
            {selectedNote && (
                <View style={styles.selectedNoteContainer}>
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


                    <Button title="Edit" onPress={handleEdit} color="blue" />
                    <Button title="Delete" onPress={handleDelete} color="red" />
                </View>
            )}
            <Button title={'Go Back'} onPress={() => navigation.navigate('PageTwo')}
                    color={'blue'}
            />
            <View>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <Button title="Pick an image" onPress={pickImage} />
                {image && <Button title="Upload" onPress={handleUpload} />}
            </View>

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
        height: 50,
        width: 300,
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
        // make a text hidden
        TextOverflow: 'ellipsis',

    }
    ,
    selectedNoteContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        margin: 10,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    }


});

export default PageThree;