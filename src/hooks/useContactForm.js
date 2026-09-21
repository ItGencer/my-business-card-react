import { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';

/**
 * @typedef {Object} ContactFormFields
 * @property {string} name
 * @property {string} email
 * @property {string} message
 */

/**
 * @typedef {Object} ContactFormMessages
 * @property {string} name
 * @property {string} email
 * @property {string} message
 * @property {string} success
 * @property {string} error
 * @property {string} configError
 */

/**
 * @typedef {Object} FormErrors
 * @property {string|undefined} [name]
 * @property {string|undefined} [email]
 * @property {string|undefined} [message]
 */

/**
 * @typedef {Object} EmailConfig
 * @property {string|undefined} serviceId
 * @property {string|undefined} templateId
 * @property {string|undefined} publicKey
 */

/** @typedef {'idle' | 'validating' | 'invalid' | 'sending' | 'success' | 'error'} FormStatusValue */

/**
 * @type {ContactFormFields}
 */
const initialFields = {
  name: '',
  email: '',
  message: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const formStatus = {
  idle: 'idle',
  validating: 'validating',
  invalid: 'invalid',
  sending: 'sending',
  success: 'success',
  error: 'error',
};

/**
 * @param {ContactFormMessages} messages
 * @returns {{
 *   fields: ContactFormFields,
 *   errors: FormErrors,
 *   status: FormStatusValue,
 *   serverMessage: string,
 *   handleChange: (event: { target: { name: string, value: string } }) => void,
 *   handleSubmit: (event: { preventDefault: () => void }) => Promise<void>,
 *   resetForm: () => void,
 * }}
 */
export function useContactForm(messages) {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(/** @type {FormStatusValue} */ (formStatus.idle));
  const [serverMessage, setServerMessage] = useState('');

  /** @type {EmailConfig} */
  const emailConfig = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    }),
    [],
  );

  /**
   * @param {ContactFormFields} currentFields
   * @returns {FormErrors}
   */
  const validate = (currentFields) => {
    const nextErrors = {};

    if (currentFields.name.trim().length < 2) {
      nextErrors.name = messages.name;
    }

    if (!emailPattern.test(currentFields.email.trim())) {
      nextErrors.email = messages.email;
    }

    if (currentFields.message.trim().length < 12) {
      nextErrors.message = messages.message;
    }

    return nextErrors;
  };

  /**
   * @param {{ target: { name: string, value: string } }} event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFields((currentFields) => ({
      ...currentFields,
      [name]: value,
    }));

    if (status === formStatus.invalid) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: undefined,
      }));
    }
  };

  const resetForm = () => {
    setFields(initialFields);
    setErrors({});
    setServerMessage('');
    setStatus(/** @type {FormStatusValue} */ (formStatus.idle));
  };

  /**
   * @param {{ preventDefault: () => void }} event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(/** @type {FormStatusValue} */ (formStatus.validating));
    setServerMessage('');

    const validationErrors = validate(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus(/** @type {FormStatusValue} */ (formStatus.invalid));
      return;
    }

    setErrors({});
    setStatus(/** @type {FormStatusValue} */ (formStatus.sending));

    try {
      if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
        throw new Error('missing-emailjs-config');
      }

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: fields.name.trim(),
          reply_to: fields.email.trim(),
          message: fields.message.trim(),
        },
        { publicKey: emailConfig.publicKey },
      );

      setStatus(/** @type {FormStatusValue} */ (formStatus.success));
      setServerMessage(messages.success);
      setFields(initialFields);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'unknown-error';

      setStatus(/** @type {FormStatusValue} */ (formStatus.error));
      setServerMessage(errorMessage === 'missing-emailjs-config' ? messages.configError : messages.error);
    }
  };

  return {
    fields,
    errors,
    status,
    serverMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
