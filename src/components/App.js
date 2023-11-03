import React, { useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
 }
 
 function handleEditProfileClick() {
     setEditProfilePopupOpen(true)
 }
 
 function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
 }

 function handleCardClick(card) {
  setSelectedCard(card)

 }

 function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditProfilePopupOpen(false)
    setSelectedCard(null)
 }

  return (
    <div className="App">

  <div className="content">
    <Header />
    <Main 
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
    />
    <Footer />

      <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      >
      <input
            name="userName"
            id="userName"
            type="text"
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
            minLength={2}
            maxLength={200}
            required
            placeholder="Сфера деятельности"
            className="popup__input popup__input_el_job"
          />
          <span id="about-error" className="popup__input-error" />

      </PopupWithForm>

      <PopupWithForm
      name='add'
      title='Новое Место'
      buttonText='Создать'
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      >
      <input
            required
            name="name"
            id="formAddName"
            type="text"
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
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_el_link"
          />
          <span id="formAddLink-error" className="popup__input-error" />
      </PopupWithForm>

 


  </div>

    <PopupWithForm
      name='delete'
      title='Вы Уверены?'
      buttonText='Да'
    >
    </PopupWithForm>
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
    >
      <input
          required=""
          name="avatar"
          id="formAvatar"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_el_avatar"
        />
        <span id="formAvatar-error" className="popup__input-error" />
    </PopupWithForm>
 

    <ImagePopup 
       card={selectedCard}
       onClose={closeAllPopups}
    />


      
    </div>
  );
}

export default App;
