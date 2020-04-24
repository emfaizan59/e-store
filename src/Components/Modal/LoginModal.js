import React from 'react'
import { Modal, Header, Button, Icon, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import LoginComponent from '../LoginComponent/LoginComponent'
class MyModal extends React.Component {


  render() {
    return (
      <Modal 
        open={this.props.modalOpen}
        size='small'
        closeOnEscape={true}
        closeOnRootNodeClick={true}
        closeOnDimmerClick={true}
        basic
      >
        <Header icon='browser' content='You are not logged in. Kindly Log in to proceed.' />
        

        <LoginComponent />
<Divider />
        <Modal.Actions>
          <Button
            negative
            type='button'
            icon='remove'
            labelPosition='right'
            onClick={this.props.handleClose}
            content='Cancel'
          />
      
        </Modal.Actions>
      </Modal>
    )
  }
}

MyModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  valueIntoModal: PropTypes.string.isRequired
}

export default MyModal