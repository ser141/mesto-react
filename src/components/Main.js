import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete
}) {

const currentUser = useContext(CurrentUserContext)

  return(
    <main>
    <section className="profile">
      <button onClick={onEditAvatar} type="button" className="profile__avatar-btn">
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
      </button>
      <div className="profile__info">
        <h1 className="profile__name">{currentUser.name}</h1>
        <p className="profile__activity">{currentUser.about}</p>
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
            <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id}/>
           ))}
        </ul>
    </section>

  </main>

  
  )
}

export default Main