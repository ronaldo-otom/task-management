import React from 'react';
import {connect} from 'react-redux';
import ListComponent from '../../../components/lists/listComponent';

const ListContainer = (props) => {
    return (
        <ListComponent props={props} />
    );
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);