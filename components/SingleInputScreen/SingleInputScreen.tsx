import {SafeAreaView, View, Image, Text, TextInput, TouchableOpacity} from 'react-native'
import { gStyles } from '../../gStyles'
import { StackParams } from '../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<StackParams, "singleInputScreen">

const SingleInputScreen = (props: Props) => {

  return (
    <SafeAreaView style={gStyles.screenCont}>
        <View style={{...gStyles.screen, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{position: 'absolute', top: '20%', left: 0}}>
                <Text style={gStyles.secondaryText}>{props.route.params.type == 'string' ? 'Please input the name of the:' : 'Please input the number of: '}</Text>
                <Text style={{...gStyles.headingText}}>{props.route.params.heading}</Text>
            </View>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, position: 'absolute', top: 10, left: 0}} onPress={() => props.navigation.goBack()}>
              <Image style={{width: 10, height: 8, transform: [{rotate: '90deg'}]}} source={require('../../assets/arrow.png')}></Image>
              <Text style={gStyles.regularText}>Go back</Text>
            </TouchableOpacity>
            <TextInput style={gStyles.input} onSubmitEditing={e => props.route.params.onSubmit(e.nativeEvent.text)}></TextInput>
        </View>
    </SafeAreaView>
  )
}

export default SingleInputScreen