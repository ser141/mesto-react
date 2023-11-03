import React, { useEffect, useState } from "react";
import {api} from '../utils/api.js'
import Card from "./Card.js";

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick
}) {

const [userName, setUserName] = useState('');
const [userDescription, setUserDescription] = useState('')
const [userAvatar, setUserAvatar] = useState('')
const [cards, setCards] = useState([])

useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, card]) => {
        setUserName(user.name)
        setUserDescription(user.about)
        setUserAvatar(user.avatar)
        setCards(card)
    }).catch(err => console.log(err))
}, [])


  return(
    <main>
    <section className="profile">
      <button onClick={onEditAvatar} type="button" className="profile__avatar-btn">
        <img className="profile__avatar" src={userAvatar} alt="Аватар" />
      </button>
      <div className="profile__info">
        <h1 className="profile__name">{userName}</h1>
        <p className="profile__activity">{userDescription}</p>
        <button
          type="button"
          className="profile__button-edit"
          aria-label="Кнопка редактирования профиля"
          onClick={onEditProfile}
        />
      </div>
      <button
        type="button"
        className="profile__button-add"
        aria-label="Кнопка добавления карточек"
        onClick={onAddPlace}
      />
    </section>

    <section>
        <ul className="elements">
           {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} key={card._id}/>
           ))}
        </ul>
    </section>

  </main>

  
  )
}

export default Main