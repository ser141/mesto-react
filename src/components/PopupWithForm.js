import React, { Children } from "react";

export default function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <form
            name={props.name}
            className="popup__form popup__form_type_edit"
            noValidate>
            {props.children}
            <button type="submit" className="popup__save-btn">
              {props.buttonText}
            </button>
          </form>
          <button
            type="button"
            className="popup__close-btn"
            aria-label="Кнопка закрытия попапа"
            onClick={props.onClose}
          />
        </div>
      </div>
    )
}