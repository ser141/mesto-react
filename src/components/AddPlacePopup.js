import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [cardName, setCardName] = useState('');
    const [cardLink, setCardLink] = useState('');

    useEffect(() => {
        if (isOpen) {
            setCardName('')
            setCardLink('')
        }
        
    }, [isOpen])

    function handleChange(e) {
        const {name, value} = e.target;
        if (name === 'name') {
            setCardName(value)
        } else if (name === 'link') {
            setCardLink(value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        onAddPlace({
            name: cardName,
            link: cardLink
        })
    }

    return(
        <PopupWithForm
      name='add'
      title='Новое Место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <input
            required
            name="name"
            id="formAddName"
            type="text"
            value={cardName}
            onChange={handleChange}
            minLength={2}
            maxLength={20}
            placeholder="Название"
            className="popup__input popup__input_el_title"
          />
          <span id="formAddName-error" className="popup__input-error" />
          <input
            required
            name="link"
            id="formAddLink"
            type="url"
            value={cardLink}
            onChange={handleChange}
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_el_link"
          />
          <span id="formAddLink-error" className="popup__input-error" />
      </PopupWithForm>
    )
}

export default AddPlacePopup