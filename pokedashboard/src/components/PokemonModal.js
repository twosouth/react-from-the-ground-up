import React from 'react';
import { Modal, Button } from 'react-bootstrap/lib/';
import PokemonInfo from './PokemonInfo'

const PokemonModal = ({ closeModal, showModal, pokemon}) => {
    
        return (
          <div className="modal-container" style={{height: 200}}>    
            <Modal
              show={showModal}
              onHide={closeModal}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">{pokemon ? pokemon.name: null}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                { pokemon ? <PokemonInfo pokemon={pokemon}  />  : null }
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      


 }

export default PokemonModal;