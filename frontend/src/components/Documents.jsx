import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {documents, auth} from "../actions";

class Documents extends Component {
    state = {name: ""}

    addDocument = (e) => {
        e.preventDefault();
        this.props.addDocument(this.state.name);
        this.setState({name: ""});
    }

    componentDidMount() {
        this.props.fetchDocuments();
    }

    render() {
        return (
            <div>
                <h2>Welcome to Documento!</h2>
                <p>
                    <Link to="/contact">Click Here</Link> to contact us!
                </p>
                <div style={{textAlign: "right"}}>
                    {this.props.user.username} (
                    <button onClick={this.props.logout}>logout</button>
                    )
                </div>
                <form onSubmit={this.addDocument}>
                    <input
                        value={this.state.name}
                        placeholder="Enter document title here..."
                        onChange={(e) => this.setState({name: e.target.value})}
                        required/>
                    <input type="submit" value="Save Document"/>
                </form>
                {this.props.documents.map((document, id) => (<div key={`note_${id}`}>
                    {document.name}
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
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDocuments: () => {
            return dispatch(documents.fetchDocuments());
        },
        addDocument: (name) => {
            return dispatch(documents.addDocument(name));
        },
        updateDocument: (id, name) => {
            return dispatch(documents.updateDocument(id, name));
        },
        deleteDocument: (id) => {
            return dispatch(documents.deleteDocument(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);