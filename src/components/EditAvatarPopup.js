import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const inputRef = useRef()

    useEffect(() => {
        if (isOpen) {
            inputRef.current.value = '';
        }
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value
        })
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                required=""
                name="avatar"
                id="formAvatar"
                type="url"
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_el_avatar"
                ref={inputRef}
            />
            <span id="formAvatar-error" className="popup__input-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup