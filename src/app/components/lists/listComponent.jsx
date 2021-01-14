import React from 'react'
import TasklistComponent from './tasklists/tasklistComponent'
import {Container} from 'react-bootstrap';

function ListComponent() {
    return (
        <div>
            <Container>
                <TasklistComponent />
            </Container>
        </div>
    )
}

export default ListComponent
