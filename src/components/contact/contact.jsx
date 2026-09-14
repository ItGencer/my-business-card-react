import React from "react";
import "./contact.scss";

const contacts = [
  {
    name: "PHONE",
    value: "+380 93 647 0424",
    action: "Подзвонити",
    href: "tel:+380936470424",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    type: "phone",
  },
  {
    name: "TELEGRAM",
    value: "@gencerIT",
    action: "Написати в Telegram",
    href: "https://t.me/gencerIT",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-2 1.94c-.23.23-.42.42-.82.42z" />
      </svg>
    ),
    type: "telegram",
  },
  {
    name: "EMAIL",
    value: "gencer.it.1989@gmail.com",
    action: "Написати email",
    href: "mailto:gencer.it.1989@gmail.com",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    type: "email",
  },
  {
    name: "LINKEDIN",
    value: "Artem Hrishyn",
    action: "Відкрити LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18v-8.4H5.67V18h2.67zM7 8.48c.86 0 1.4-.57 1.4-1.28-.02-.73-.54-1.28-1.38-1.28-.84 0-1.4.55-1.4 1.28 0 .71.54 1.28 1.37 1.28H7zM18.34 18h.01v-4.68c0-2.5-1.34-3.67-3.12-3.67-1.44 0-2.08.79-2.44 1.35v-1.4h-2.67c.03.75 0 8.4 0 8.4h2.67v-4.69c0-.25.02-.5.09-.68.2-.5.65-1.02 1.42-1.02.99 0 1.39.76 1.39 1.87V18h2.65z" />
      </svg>
    ),
    type: "linkedin",
  },
];

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h2 className="contact__title" >Зв'язатися зі мною</h2>
      <p className="contact__text" >Маєте проєкт або питання? Напишіть — відповім швидко.</p>

      <div className="contact__content">
        <form className="contact__form">
          <label className="contact__field">
            <input type="text" placeholder="Ваше ім'я" />
          </label>

          <label className="contact__field">
            <input type="email" placeholder="Email" />
          </label>

          <label className="contact__field contact__field--message">
            <textarea rows="5" placeholder="Повідомлення" />
          </label>

          <button type="submit" className="contact__form__submit">
            <span className="contact__submit__icon">➤</span>
            <span>Надіслати</span>
          </button>
        </form>

        <div className="contact__social">
          <div className="contact__social__header">
            <h3 className="contact__social__header__title">
              Оберіть зручний спосіб зв'язку
            </h3>
            <p className="contact__social__header__text">
              Телефон, Telegram, email або LinkedIn — усі канали активні.
            </p>
          </div>

          <ul className="contact__social__links">
            {contacts.map(({ name, value, action, href, icon, type }) => (
              <li
                key={name}
                className="contact__social__links__link"
                href={href}
                target={
                  type === "phone" || type === "email" ? undefined : "_blank"
                }
                rel={
                  type === "phone" || type === "email"
                    ? undefined
                    : "noreferrer"
                }
              >
                <div className="contact__social__links__link__icon">{icon}</div>

                <ul className="contact__social__links__link__text">
                  <li className="contact__social__links__link__text__label">
                    {name}
                  </li>
                  <li className="contact__social__links__link__text__value">
                    {value}
                  </li>
                  <li className="contact__social__links__link__text__action">
                    <span>{action}</span>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
