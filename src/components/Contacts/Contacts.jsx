import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { formStatus, useContactForm } from "../../hooks/useContactForm.js";
import { useTypewriter } from "../../hooks/useTypewriter.js";

export default function Contacts() {
  const { t } = useTranslation();
  const translatedLinks = t("contacts.links", { returnObjects: true });
  const links = Array.isArray(translatedLinks) ? translatedLinks : [];
  const { targetRef, displayedText } = useTypewriter(t("contacts.title"));
  const form = useContactForm({
    name: t("contacts.validation.name"),
    email: t("contacts.validation.email"),
    message: t("contacts.validation.message"),
    success: t("contacts.success"),
    error: t("contacts.error"),
    configError: t("contacts.configError"),
  });

  const isSending = form.status === formStatus.sending;

  return (
    <motion.section
      id="contacts"
      className="contacts section"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container contacts__grid">
        <p className="section__eyebrow">{t("contacts.eyebrow")}</p>
        <h2 ref={targetRef} className="section__title">
          {displayedText}
        </h2>
        <p className="section__lead">{t("contacts.lead")}</p>

        <div className="section__lead__form">
          <div className="contacts__links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <span>{link.label}</span>
                <strong>{link.value}</strong>
              </a>
            ))}
          </div>
          <form
            className="contact-form glass-panel"
            onSubmit={form.handleSubmit}
            noValidate
          >
            <label>
              <span>{t("contacts.name")}</span>
              <input
                type="text"
                name="name"
                value={form.fields.name}
                placeholder={t("contacts.namePlaceholder")}
                onChange={form.handleChange}
                aria-invalid={Boolean(form.errors.name)}
              />
              {form.errors.name ? <em>{form.errors.name}</em> : null}
            </label>

            <label>
              <span>{t("contacts.email")}</span>
              <input
                type="email"
                name="email"
                value={form.fields.email}
                placeholder={t("contacts.emailPlaceholder")}
                onChange={form.handleChange}
                aria-invalid={Boolean(form.errors.email)}
              />
              {form.errors.email ? <em>{form.errors.email}</em> : null}
            </label>

            <label>
              <span>{t("contacts.message")}</span>
              <textarea
                name="message"
                rows={5}
                value={form.fields.message}
                placeholder={t("contacts.messagePlaceholder")}
                onChange={form.handleChange}
                aria-invalid={Boolean(form.errors.message)}
              />
              {form.errors.message ? <em>{form.errors.message}</em> : null}
            </label>

            {form.serverMessage ? (
              <p
                className={`contact-form__status contact-form__status--${form.status}`}
              >
                {form.serverMessage}
              </p>
            ) : null}

            <div className="contact-form__actions">
              <button
                className="button button--primary"
                type="submit"
                disabled={isSending}
              >
                {isSending ? t("contacts.sending") : t("contacts.submit")}
              </button>
              <button
                className="button button--ghost"
                type="button"
                onClick={form.resetForm}
              >
                {t("contacts.reset")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
