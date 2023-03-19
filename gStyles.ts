import { StyleSheet } from "react-native"

export const gStyles = StyleSheet.create({
    regularText: {
        color: 'white',
    },
    regularTextInput: {
        color: 'white',
        padding: 10
    },
    secondaryHeadingText: {
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 5 
    },
    secondaryText: {
        color: 'rgba(255,255,255,0.5)',
    },
    headingText: {
        color: 'white',
        fontSize: 22,
        fontWeight: "700"

    },
    screenHeading: {
        fontSize: 70,
        fontWeight: "bold",
        color: "red",
        textTransform: 'uppercase'

    },
    secondaryScreenHeading: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 40,
        textTransform: 'uppercase',
        fontWeight: "bold"
    },
    screenCont: {
        backgroundColor: '#121212',
        height: '100%'
    },
    screen: {
        margin: 15,
        height: '100%'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'red',
        backgroundColor: '#1F1F21',
        minWidth: 100,
        minHeight: 100,
        textAlign: "center",
        fontSize: 30,
        color: 'white',
        padding: 20
    },
    secondaryBtn: {
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: '#444', 
        padding: 8, 
        borderRadius: 50
    },
    btnText: {
        color: 'white',
        fontWeight: '600'
    },

    bgGreen: {
        backgroundColor: 'green'
    },
    bgRed: {
        backgroundColor: 'red'
    },
    bgBlue: {
        backgroundColor: 'blue'
    }
})
