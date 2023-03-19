import { Alert } from "react-native"

export const deleteAlert = (itemToDelete: string, deleteFunc: () => void) => {
    const itemToDeleteCapital = itemToDelete.charAt(0).toUpperCase() + itemToDelete.slice(1);
    Alert.alert('Delete ' + itemToDeleteCapital, 'Do you want to delete this ' + itemToDelete, [
        {
            text: 'Cancel',
            onPress: () => {}
        },
        {
            text: 'Delete',
            onPress: deleteFunc
        }
    ])
}