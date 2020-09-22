const initialState = [
    {text: "Write code!"}
];


export default function documents(state = initialState, action) {
    let documentList = state.slice();
    switch (action.type) {
        case "ADD_DOCUMENT":
            return [...state, {text: action.text}];
        case "UPDATE_DOCUMENT":
            let documentToUpdate = documentList[action.id];
            documentToUpdate.text = action.text;
            documentList.splice(action.id, 1, documentToUpdate);
            return documentList;
        case "DELETE_DOCUMENT":
            documentList.splice(action.id, 1);
            return documentList
        default:
            return state;
    }
}