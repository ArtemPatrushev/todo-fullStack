import { type FC, type FormEvent, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import s from './SimpleStringInputModal.module.scss';

type SimpleStringInputModalProps = {
  isOpen: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title?: string;
  placeholder?: string;
  submitLabel?: string;
  cancelLabel?: string;
};

export const SimpleStringInputModal: FC<SimpleStringInputModalProps> = ({
  isOpen,
  value,
  onChange,
  onClose,
  onSubmit,
  title = 'Введите значение',
  placeholder = '',
  submitLabel = 'Создать',
  cancelLabel = 'Отмена',
}) => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(value);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={s.root} role="dialog" aria-modal="true" aria-labelledby="simple-string-input-modal-title">
      <button type="button" className={s.overlay} aria-label="Закрыть" onClick={onClose} />
      <div className={s.panel}>
        <h2 id="simple-string-input-modal-title" className={s.title}>
          {title}
        </h2>
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={s.input}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            autoFocus
          />
          <div className={s.actions}>
            <button type="button" className={s.btnSecondary} onClick={onClose}>
              {cancelLabel}
            </button>
            <button type="submit" className={s.btnPrimary}>
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
