import React, { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/api.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, card]) => {
      setCurrentUser(user)
      setCards(card)
    }).catch(err => console.log(err))
  }, [])

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
    setImagePopupOpen(true)
 }


 function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditProfilePopupOpen(false)
    setImagePopupOpen(false)
    setSelectedCard(false)
 }

 function handleCardLike(card) {
  const isLiked = card.likes.some(item => item._id === currentUser._id)

  api.changeLikesCardStatus(card._id, isLiked)
  .then((newCard) => {
     setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
  }).catch(err => console.log(err))
 }

 function handleCardDelete(card) {
  api.deleteCard(card._id).then(() => {
    setCards(cards.filter((item) => item._id !== card._id))
   }).catch(err => console.log(err))


}




 function handleUpdateUser({name, about}) {
  api.updateUserInfo({name, about}).then((res) => {
    setCurrentUser(res);
    closeAllPopups()
  }).catch(err => console.log(err))
 }

 function handleUpdateAvatar(value) {
  api.setAvatar(value).then((res) => {
    setCurrentUser(res);
    closeAllPopups()
  }).catch(err => console.log(err))
 }

 function handleAddPlaceSubmit({name, link}) {
  api.createNewCard({name, link}).then((newCard) => {
    setCards([newCard, ...cards])
    closeAllPopups()
  }).catch(err => console.log(err))
 }




  return (
    <div className="App">
<CurrentUserContext.Provider value={currentUser}>
  <div className="content">
    
    <Header />
    <Main 
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      cards={cards}
    />
    <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />


  </div>

    <PopupWithForm
      name='delete'
      title='Вы Уверены?'
      buttonText='Да'
    >
    </PopupWithForm>

    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
 

    <ImagePopup 
       card={selectedCard}
       onClose={closeAllPopups}
       isOpen={isImagePopupOpen}
    />

</CurrentUserContext.Provider>
      
    </div>
  );
}

export default App;
