import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import { WorkoutEntry } from '../WorkoutEntry'
import { Workout } from '../../models/DBModels'
import { styles } from './style'
import { gStyles } from '../../gStyles'
import { DocumentData, Firestore, addDoc, doc, limit, orderBy, query, setDoc, where } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { auth, workoutRef, workoutConverter, db } from "../../firebase/firebase"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../App'
import { useNavigation } from '@react-navigation/native'
import { LoadingScreen } from '../LoadingScreen'



const Journal = () => {

    const [workouts, loading] = useCollectionData<DocumentData>(query(workoutRef.withConverter(workoutConverter), orderBy('date'), limit(20)))
    const data: (DocumentData | '')[] = [...(workouts ? workouts : []), '']
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>()

    if(loading) {
        return <LoadingScreen></LoadingScreen>
    }


    const handleNewWorkout = async (name: string, category: string) => {
        const newWorkout: Workout = {
            name: name,
            category: category,
            date: new Date(),
            exercises: []
        }

        await addDoc(workoutRef, newWorkout)
    }


    return (

        <SafeAreaView style={gStyles.screenCont}>
            <View style={gStyles.screen}>
                <FlatList
                    contentContainerStyle={styles.centerContent}
                    data={data}
                    renderItem={({ item }) =>
                        item != '' ?
                            <WorkoutEntry workout={item} />
                            :
                            <View style={{ display: 'flex', alignItems: 'center', marginBottom: 100, marginTop: 20 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('singleInputScreen', {heading: 'Workout Name', type: 'string', onSubmit: (name) => navigation.navigate('singleInputScreen', {heading: 'Workout Category', type: 'string', onSubmit: (category) => {handleNewWorkout(name, category); navigation.pop(2)}})})}
                                    style={{ backgroundColor: 'red', padding: 20, borderRadius: 50 }}>
                                    <Image style={{ width: 20, height: 20 }} source={require("../../assets/plus-white.png")} />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 10, ...gStyles.regularText }}>New Workout</Text>
                            </View>
                    }
                >
                </FlatList>
            </View>
        </SafeAreaView>
    )
}

export default Journal