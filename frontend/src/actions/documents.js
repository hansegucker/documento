export const addDocument = text => {
    return {
        type: "ADD_DOCUMENT",
        text
    }
}

export const updateDocument = (id, text) => {
    return {
        type: 'UPDATE_DOCUMENT',
        id,
        text
    }
}

export const deleteDocument = id => {
    return {
        type: 'DELETE_DOCUMENT',
        id
    }
}
