import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {

    function handleClick() {
        onCardClick(card);
      } 

      function handleLikeClick() {
        onCardLike(card)
      }

      function handleDeleteClick() {
        onCardDelete(card)
      }


    const currentUser = useContext(CurrentUserContext)

    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like-icon ${isLiked && 'element__like-icon_active'}`
        );;


    return(
        <li className="element">
        <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
       {isOwn && <button type="button" className="element__delete-btn" onClick={handleDeleteClick}  aria-label="Кнопка удаления"></button>}
        <div className="element__info">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-container">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Кнопка лайка"></button>
                <p className="element__like-counter">{card.likes.length}</p>
            </div>
            

        </div>
</li>
    )
}