import React, {useEffect} from "react";
import {Link as RouterLink, useParams} from "react-router-dom";
import {documents} from "../actions";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import {useStyles} from "../styles";
import {PDFObject} from "react-pdfobject";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function DocumentViewer(props) {
  const classes = useStyles();

  useEffect(() => {
    props.fetchDocuments();
  }, [props.user]);

  let {id} = useParams();
  let document = props.documents[id];

  return document ? (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" component={RouterLink} to={"/"}>
          <FormattedMessage
            id={"documents.texts.allDocuments"}
            defaultMessage={"All documents"}
          />
        </Link>
        <Typography color="textPrimary">{document.name}</Typography>
      </Breadcrumbs>
      <Typography component={"h1"} variant={"h4"}>
        {document.name}
      </Typography>
      <PDFObject url={document.file} className={classes.pdfObject} />
    </div>
  ) : (
    <div />
  );
}

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDocuments: () => {
      return dispatch(documents.fetchDocuments());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewer);
