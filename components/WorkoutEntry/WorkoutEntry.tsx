import React, { useRef } from 'react'
import { Image, TouchableOpacity, View, Text, FlatList, GestureResponderEvent, TextInput, Alert } from 'react-native'
import { Exercise, Workout } from '../../models/DBModels'
import { gStyles } from '../../gStyles'
import ExerciseEntry from '../ExerciseEntry/ExerciseEntry'
import { styles } from './style'
import { DocumentData, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../App'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../firebase/firebase'
import { deleteAlert } from '../../utils'

interface Props {
    workout: DocumentData
}

const WorkoutEntry = (props: Props) => {

    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>()


    const addExercise = async (name: string) => {
        const newExercise = {
            name: name,
            sets: []
        }
        let exercises = []
        if (JSON.stringify(props.workout.exercises) == JSON.stringify([])) {
            exercises = [newExercise]
        } else {
            exercises = [...props.workout.exercises, newExercise]
        }

        const newWorkout: Workout = {
            ...props.workout as Workout,
            exercises: exercises
        }

        await setDoc(doc(db, "workouts", props.workout.id), newWorkout)
    }

    const updateNote = async (text: string) => {

        const newWorkout: Workout = {
            ...props.workout as Workout,
            note: text
        }

        await setDoc(doc(db, "workouts", props.workout.id), newWorkout)
    }

    const handleDeleteNote = () => {
        Alert.alert('Delete Note', 'Do you want to delete this note?', [
            {
                text: 'Cancel',
                onPress: () => console.log('canceled')
            },
            {
                text: 'Delete',
                onPress: () => updateNote('')
            }
        ])
    }

    return (
        <View style={{ marginVertical: 20, borderTopWidth: 1, borderTopColor: 'white' }}>
            <View style={{ marginTop: 20, paddingBottom: 20 }}>
                <Text style={{ ...gStyles.regularText, position: 'absolute' }}>{props.workout.date.toDate().toLocaleDateString()}</Text>
                <Text onLongPress={() => deleteAlert('workout', () => deleteDoc(doc(db, "workouts", props.workout.id)))} style={{ ...gStyles.headingText, textAlign: 'center' }}>{props.workout.name} - {props.workout.category}</Text>

            </View>

            {props.workout.note ?
                <View style={styles.widget}>
                    <Text onLongPress={handleDeleteNote} style={gStyles.secondaryHeadingText}>Note</Text>
                    <TextInput onSubmitEditing={e => updateNote(e.nativeEvent.text)}
                        onEndEditing={e => updateNote(e.nativeEvent.text)}
                        style={gStyles.regularText}>
                        {props.workout.note}
                    </TextInput>
                </View>
                :
                <TouchableOpacity onPress={() => updateNote('New Note')}
                    style={{ ...gStyles.secondaryBtn, display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'center' }}>
                    <Image style={{ width: 10, height: 10 }} source={require('../../assets/plus-white.png')} />
                    <Text style={gStyles.btnText}>Note</Text>
                </TouchableOpacity>
            }

            <View style={styles.widget}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={gStyles.secondaryHeadingText}>Exercise</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%' }}>
                        <Text style={gStyles.secondaryHeadingText}>Sets</Text>
                        <Text style={gStyles.secondaryHeadingText}>Reps</Text>
                        <Text style={gStyles.secondaryHeadingText}>Weight</Text>
                    </View>
                </View>

                <FlatList
                    data={props.workout.exercises as Exercise[]}
                    renderItem={({ item, index }) => <ExerciseEntry exercise={item} index={index} workout={props.workout} />}
                ></FlatList>

                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("singleInputScreen", { heading: 'Exercise name', type: 'string', onSubmit: (result) => { addExercise(result); navigation.goBack() } })}
                        style={gStyles.secondaryBtn}>
                        <Image style={{ width: 10, height: 10 }} source={require("../../assets/plus-white.png")} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default WorkoutEntry