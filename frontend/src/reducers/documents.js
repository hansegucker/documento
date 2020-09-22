const initialState = [];


export default function documents(state = initialState, action) {
    let documentList = state.slice();
    switch (action.type) {
        case 'FETCH_DOCUMENTS':
            return [...state, ...action.documents];
        case "ADD_DOCUMENT":
            return [...state, action.document];
        case "UPDATE_DOCUMENT":
            let documentToUpdate = documentList[action.idx];
            documentToUpdate.name = action.document.name;
            documentList.splice(action.idx, 1, documentToUpdate);
            return documentList;
        case "DELETE_DOCUMENT":
            documentList.splice(action.idx, 1);
            return documentList
        default:
            return state;
    }
}