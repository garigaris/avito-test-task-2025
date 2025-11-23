import { RejectionReason } from "./apiTypes";

export const REJECTION_TEMPLATES: { label: string; value: RejectionReason }[] = [
  { label: 'Запрещённый товар', value: 'Запрещенный товар' },
  { label: 'Неверная категория', value: 'Неверная категория' },
  { label: 'Некорректное описание', value: 'Некорректное описание' },
  { label: 'Проблемы с фото', value: 'Проблемы с фото' },
  { label: 'Подозрение на мошенничество', value: 'Подозрение на мошенничество' },
  { label: 'Другое', value: 'Другое' },
];
