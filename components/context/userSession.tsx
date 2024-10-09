import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'usuarioToken'

export const saveToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync(TOKEN_KEY, token)
        return true
    } catch (error) {
        console.log('Error saving token', error)
        return false;
    }
}

export const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY)
        return token
    } catch (error) {
        console.log('Error getting token', error)
        return null;
    }
}


export const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        return true
    } catch (error) {
        console.log('Error deleting token', error)
        return false;
    }
}


