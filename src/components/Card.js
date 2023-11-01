import React from "react";

export default function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
      } 

    return(
        <li className="element">
        <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
        <button type="button" className="element__delete-btn" aria-label="Кнопка удаления"></button>
        <div className="element__info">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-container">
                <button type="button" className="element__like-icon" aria-label="Кнопка лайка"></button>
                <p className="element__like-counter">{card.likes.length}</p>
            </div>
            

        </div>
</li>
    )
}