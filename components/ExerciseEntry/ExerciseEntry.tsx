import { Text, FlatList, Image, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { Exercise, Set as ExerciseSet, Workout } from '../../models/DBModels'
import { Reducer, useContext, useEffect, useReducer, useState } from 'react'
import { gStyles } from '../../gStyles'
import { DocumentData, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParams } from '../../App'
import { deleteAlert } from '../../utils'


interface Props {
  exercise: Exercise,
  index: number,
  workout: DocumentData
}

const ExerciseEntry = (props: Props) => {

  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>()
  //const [exercise, exDispatch] = useReducer<Reducer<Exercise, {type: ExerciseAction, func: () => void} >>(exerciseReducer, props.exercise)

  //const [newSet, setNewSet] = useState<ExerciseSet>({ reps: 0, weight: 0 })
  const getUniqSets = (sets: ExerciseSet[],) => {
    const repWeightComb = sets.map(set => [set.reps, set.weight]) // returns all combinations of reps and weight
    const uniqRepWeightComb = Array.from(new Set(repWeightComb.map(item => JSON.stringify(item)))).map(item => JSON.parse(item)) // returns all uniq reps and weight combinations (used json because set would not work on arrays)
    return [repWeightComb, uniqRepWeightComb]
  }

  const [repWeightComb, uniqRepWeightComb] = getUniqSets(props.exercise.sets)

  const exSets = uniqRepWeightComb.map(uniqComb => {

    return {
      sets: repWeightComb.filter(comb => comb.toString() == uniqComb.toString()).length,
      reps: uniqComb[0],
      weight: uniqComb[1]
    }
  }
  )

  const updateExercise = async (func: (ex: Exercise) => Exercise) => {

    const updatedExercises = (props.workout.exercises as Exercise[]).map(
      (ex, exI) =>
        exI == props.index
          ? func(ex)
          : ex
    )

    const newWorkout: Workout = {
      ...props.workout as Workout,
      exercises: updatedExercises
    }



    await setDoc(doc(db, "workouts", props.workout.id), newWorkout)
  }

  const updateSet = async (updatedValue: number, setToUpdate: ExerciseSet) => {

    updateExercise((ex) => {
      return {
        ...ex, sets: exSets.map((set, setI) =>
          set.reps == setToUpdate.reps && set.weight == setToUpdate.weight
            ? Array.from({ length: updatedValue }, (item, i) => { return { reps: set.reps, weight: set.weight } })
            : Array.from({ length: set.sets }, (item, i) => { return { reps: set.reps, weight: set.weight } })
        ).flat()
      }
    })

  }

  const updateSetContent = (finalExerciseSet: ExerciseSet, setToUpdate: ExerciseSet) => {
    updateExercise((ex) => {
      return {
        ...ex, sets: ex.sets.map(set =>
          set.reps == setToUpdate.reps && set.weight == setToUpdate.weight
            ? finalExerciseSet
            : set)
      }
    })
  }

  const updateReps = async (updatedValue: number, setToUpdate: ExerciseSet) => {
    updateSetContent({ ...setToUpdate, reps: updatedValue }, setToUpdate)
  }

  const updateWeight = async (updatedValue: number, setToUpdate: ExerciseSet) => {
    updateSetContent({ ...setToUpdate, weight: updatedValue }, setToUpdate)
  }

  const addSet = async (newSet: ExerciseSet) => {
    updateExercise((ex) => {
      return {
        ...ex, sets: [...ex.sets, newSet]
      }
    })

  }

  const deleteExercise = async () => {

    const updatedExercises = props.workout.exercises
    updatedExercises.splice(props.index, 1)

    const newWorkout: Workout = {
      ...props.workout as Workout,
      exercises: updatedExercises
    }



    await setDoc(doc(db, "workouts", props.workout.id), newWorkout)
  }


  return (
    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: '#444', borderBottomWidth: 1, paddingVertical: 10 }}>
      <View style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text onLongPress={() => deleteAlert('exercise', () => deleteExercise())} style={{ ...gStyles.regularText }}>{props.exercise.name}</Text>
        <TouchableOpacity style={{ ...gStyles.secondaryBtn, minWidth: 80, marginVertical: 8 }}
          onPress={() => navigation.navigate("singleInputScreen", { heading: 'Reps', type: 'number', onSubmit: (result) => { navigation.navigate("singleInputScreen", { heading: 'Weight', type: 'number', onSubmit: (result2) => { addSet({ reps: Number(result), weight: Number(result2) }); navigation.navigate("journal", {}) } }) } })}>
          <Image style={{ width: 10, height: 10 }} source={require("../../assets/plus-white.png")} />
        </TouchableOpacity>
      </View>
      <View style={{ width: '60%' }}>
        {exSets.map((sets, index) =>
          <View key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

            <TextInput
              onEndEditing={(e) => updateSet(Number(e.nativeEvent.text), { weight: sets.weight, reps: sets.reps } as ExerciseSet)}
              onSubmitEditing={(e) => updateSet(Number(e.nativeEvent.text), { weight: sets.weight, reps: sets.reps } as ExerciseSet)}
              keyboardType='numeric'
              style={gStyles.regularTextInput}>{sets.sets}</TextInput>

            <Text style={{ ...gStyles.regularTextInput, ...gStyles.secondaryText }}>x</Text>

            <TextInput
              onEndEditing={(e) => updateReps(Number(e.nativeEvent.text), { weight: sets.weight, reps: sets.reps } as ExerciseSet)}
              onSubmitEditing={(e) => updateReps(Number(e.nativeEvent.text), { weight: sets.weight, reps: sets.reps } as ExerciseSet)}
              keyboardType='numeric'
              style={gStyles.regularTextInput}>{sets.reps}</TextInput>

            <Text style={{ ...gStyles.regularTextInput, ...gStyles.secondaryText }}>x</Text>

            <TextInput
              onEndEditing={(e) => updateWeight(Number(e.nativeEvent.text), { weight: sets.weight, reps: sets.reps } as ExerciseSet)}
              onSubmitEditing={(e) => updateWeight(Number(e.nativeEvent.text), { weight: sets.weight, reps: sets.reps } as ExerciseSet)}
              keyboardType='numeric'
              style={{ ...gStyles.regularTextInput, paddingRight: 0 }}>{sets.weight}</TextInput><Text style={{ ...gStyles.regularTextInput, ...gStyles.secondaryText, paddingHorizontal: 0 }}>kg</Text>
          </View>
        )}
      </View>

    </View>
  )
}

export default ExerciseEntry