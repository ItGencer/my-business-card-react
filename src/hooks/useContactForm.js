import { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';

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

export function useContactForm(messages) {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(formStatus.idle);
  const [serverMessage, setServerMessage] = useState('');

  const emailConfig = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    }),
    [],
  );

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
    setStatus(formStatus.idle);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(formStatus.validating);
    setServerMessage('');

    const validationErrors = validate(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus(formStatus.invalid);
      return;
    }

    setErrors({});
    setStatus(formStatus.sending);

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

      setStatus(formStatus.success);
      setServerMessage(messages.success);
      setFields(initialFields);
    } catch (error) {
      setStatus(formStatus.error);
      setServerMessage(error.message === 'missing-emailjs-config' ? messages.configError : messages.error);
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
