import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {documents} from "../actions";

class Documents extends Component {
    state = {text: ""}

    addDocument = (e) => {
        e.preventDefault();
        this.props.addDocument(this.state.text);
        this.setState({text: ""});
    }

    render() {
        return (
            <div>
                <h2>Welcome to Documento!</h2>
                <p>
                    <Link to="/contact">Click Here</Link> to contact us!
                </p>
                <form onSubmit={this.addDocument}>
                    <input
                        value={this.state.text}
                        placeholder="Enter document title here..."
                        onChange={(e) => this.setState({text: e.target.value})}
                        required/>
                    <input type="submit" value="Save Document"/>
                </form>
                {this.props.documents.map((document, id) => (<div key={`note_${id}`}>
                    {document.text}
                    <button>edit</button>
                    <button onClick={() => this.props.deleteDocument(id)}>delete</button>
                </div>))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        documents: state.documents,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDocument: (text) => {
            dispatch(documents.addDocument(text));
        },
        updateDocument: (id, text) => {
            dispatch(documents.updateDocument(id, text));
        },
        deleteDocument: (id) => {
            dispatch(documents.deleteDocument(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);