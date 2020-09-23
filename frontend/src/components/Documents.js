import React, {Component} from "react";
import {connect} from 'react-redux';
import {documents, auth} from "../actions";
import {FormattedMessage, injectIntl} from 'react-intl'

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
        const {intl} = this.props;
        return (
            <div>
                <h2><FormattedMessage id="documents.texts.welcome-message" description="welcome message"
                                      defaultMessage="Welcome to documento!"/></h2>

                <div style={{textAlign: "right"}}>
                    {this.props.user.username}
                    <button onClick={this.props.logout}><FormattedMessage id={"app.buttons.logout"}
                                                                          defaultMessage={"Logout"}/></button>

                </div>
                <form onSubmit={this.addDocument}>
                    <input
                        value={this.state.name}
                        placeholder={intl.formatMessage({
                            id: "documents.placeholders.enter-title",
                            defaultMessage: "Enter title ..."
                        })}
                        onChange={(e) => this.setState({name: e.target.value})}
                        required/>
                    <input type="submit"
                           value={intl.formatMessage({id: "documents.buttons.save", defaultMessage: "Save document"})}/>
                </form>
                {this.props.documents.map((document, id) => (<div key={`note_${id}`}>
                    {document.name}
                    <button><FormattedMessage id={"documents.buttons.edit"} defaultMessage={"Edit"}/></button>
                    <button onClick={() => this.props.deleteDocument(id)}><FormattedMessage
                        id={"documents.buttons.delete"} defaultMessage={"Delete"}/></button>
                </div>))}
            </div>
        )
    }
}

Documents = injectIntl(Documents);
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