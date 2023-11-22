import React, { useContext, useEffect, useState } from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const currentUser = useContext(CurrentUserContext)

    useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '')
    }, [currentUser])

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateUser({
            name,
            about: description,
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'userName') {
            setName(value);
        } else if (name === 'about') {
            setDescription(value)
        }


    }

    return (
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                name="userName"
                id="userName"
                type="text"
                value={name}
                onChange={handleChange}
                minLength={2}
                maxLength={40}
                required
                placeholder="Ваше имя"
                className="popup__input popup__input_el_name"
            />
            <span id="userName-error" className="popup__input-error" />
            <input
                name="about"
                id="about"
                type="text"
                value={description}
                onChange={handleChange}
                minLength={2}
                maxLength={200}
                required
                placeholder="Сфера деятельности"
                className="popup__input popup__input_el_job"
            />
            <span id="about-error" className="popup__input-error" />

        </PopupWithForm>
    )


}

export default EditProfilePopup;
