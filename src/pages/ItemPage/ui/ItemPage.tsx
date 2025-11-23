import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useGetAd } from '../../../shared/api/hooks/Ads/useGetAd';
import {
  useApproveAd,
  useRejectAd,
  useRequestChanges,
} from '../../../shared/api/hooks/Ads/useChangeAdStatus';

import { REJECTION_TEMPLATES } from '../../../shared/types/reject_reasons';
import { RejectionReason } from '../../../shared/types/apiTypes';

import { useAppContext } from '../../../app/context/AppContext';
import routes from '../../../shared/routes/routes';
import { getItemDetailUrl } from '../../../shared/routes/routesHelper';
import { ItemStats } from '../ItemStats/ItemStats';
import { SellerInfo } from '../SellerInfo/SellerInfo';

import {
  getStatusClass,
  statusLabels,
  ModerationActionLabels
} from '../../../components/Ads/utils/adFormatter';

import styles from './ItemPage.module.css';

export const ItemPage = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const navigate = useNavigate();
  

  const { filteredIds, totalItems } = useAppContext();
  const { data, isError, isLoading } = useGetAd(numericId);

  const ids = filteredIds?.length
    ? filteredIds
    : Array.from({ length: totalItems || 150 }, (_, i) => i + 1);

  const currentIndex = ids.indexOf(numericId);
  const prevId = currentIndex > 0 ? ids[currentIndex - 1] : null;
  const nextId = currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null;

  const approveMutation = useApproveAd();
  const rejectMutation = useRejectAd();
  const requestChangesMutation = useRequestChanges();

  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [isChangesModalOpen, setChangesModalOpen] = useState(false);

  const [selectedReason, setSelectedReason] = useState<RejectionReason>('Другое');
  const [comment, setComment] = useState('');


  const handleApprove = useCallback(() => {
    approveMutation.mutate({ id: numericId });
  }, [approveMutation, numericId]);

  const handleReject = useCallback(() => {
    if (!selectedReason) return;
    rejectMutation.mutate(
      {
        id: numericId,
        reason: selectedReason,
        comment: selectedReason === "Другое" ? comment : ""
      },
      {
        onSuccess: () => {
          setRejectModalOpen(false);
          setComment('');
          setSelectedReason('Другое');
        },
      }
    );
  }, [rejectMutation, numericId, selectedReason, comment]);

  const handleRequestChanges = useCallback(() => {
    requestChangesMutation.mutate(
      {
        id: numericId,
        reason: "Другое",
        comment,
      },
      {
        onSuccess: () => {
          setChangesModalOpen(false);
          setComment('');
        },
      }
    );
  }, [requestChangesMutation, numericId, comment]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'A':
        case 'a':
        case 'ф':
        case 'Ф':
          handleApprove();
          break;
        case 'D':
        case 'd':
        case 'В':
        case 'в':
          setRejectModalOpen(true);
          break;
        case 'ArrowRight':
          if (nextId) navigate(getItemDetailUrl(nextId));
          break;
        case 'ArrowLeft':
          if (prevId) navigate(getItemDetailUrl(prevId));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleApprove, handleReject, prevId, nextId, navigate]);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки объявления</div>;
  if (!data) return <div>Объявление не найдено</div>;

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <Link to={routes.HOME}>← Вернуться</Link>

        {prevId ? (
          <Link to={getItemDetailUrl(prevId)}>« Предыдущее</Link>
        ) : (
          <span className={styles.disabledLink}>« Предыдущее</span>
        )}

        {nextId ? (
          <Link to={getItemDetailUrl(nextId)}>Следующее »</Link>
        ) : (
          <span className={styles.disabledLink}>Следующее »</span>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.price}>{data.price.toLocaleString()} ₽</div>

          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Статус</span>
              <span className={getStatusClass(data.status, styles)}>
                {statusLabels[data.status]}
              </span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Категория</span>
              <span className={styles.metaValue}>{data.category}</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Создано</span>
              <span className={styles.metaValue}>
                {new Date(data.createdAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h3 className={styles.sectionTitle}>Описание</h3>
            <p className={styles.description}>{data.description}</p>
          </div>

          {data.images?.length > 0 && (
            <div className={styles.imagesSection}>
              <h3 className={styles.sectionTitle}>Изображения</h3>
              <div className={styles.imagesGrid}>
                {data.images.map((img, i) => (
                  <img key={i} src={img} alt="" className={styles.image} />
                ))}
              </div>
            </div>
          )}

          <ItemStats stats={data.characteristics} />
        </div>

        <div className={styles.sidebar}>
          <SellerInfo seller={data.seller} />

          <div className={styles.actionButtons}>
            <button
              className={`${styles.button} ${styles.buttonApprove}`}
              onClick={handleApprove}
              disabled={approveMutation.isPending}
            >
              Одобрить
            </button>

            <button
              className={`${styles.button} ${styles.buttonPending}`}
              onClick={() => setChangesModalOpen(true)}
            >
              Вернуть на доработку
            </button>

            <button
              className={`${styles.button} ${styles.buttonRejected}`}
              onClick={() => setRejectModalOpen(true)}
            >
              Отклонить
            </button>
          </div>
        </div>
      </div>

      {isRejectModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Отклонить объявление</h2>

            <div className={styles.modalRow}>
              <label>Причина</label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value as RejectionReason)}
              >
                {REJECTION_TEMPLATES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedReason === "Другое" && (
              <div className={styles.modalRow}>
                <label>Укажите причину</label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Введите причину отклонения..."
                  className={styles.textInput}
                />
              </div>
            )}

            <div className={styles.modalActions}>
              <button
                className={`${styles.button} ${styles.buttonRejected}`}
                onClick={handleReject}
                disabled={selectedReason === "Другое" && !comment.trim()}
              >
                Отклонить
              </button>

              <button
                className={styles.button}
                onClick={() => setRejectModalOpen(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {isChangesModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Вернуть на доработку</h2>

            <div className={styles.modalRow}>
              <label>Комментарий</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Укажите, что нужно исправить..."
              />
            </div>

            <div className={styles.modalActions}>
              <button
                className={`${styles.button} ${styles.buttonPending}`}
                onClick={handleRequestChanges}
              >
                Отправить
              </button>
              <button
                className={styles.button}
                onClick={() => setChangesModalOpen(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        {data.moderationHistory.length > 0 && (
          <div className={styles.history}>
            <h3 className={styles.title}>История модерации</h3>

            {data.moderationHistory.map(item => (
              <div key={item.id} className={styles.item}>

                <div className={styles.row}>
                  <span className={styles.key}>Модератор:</span>
                  <span className={styles.value}>{item.moderatorName}</span>
                </div>

                <div className={styles.row}>
                  <span className={styles.key}>Дата:</span>
                  <span className={styles.value}>
                    {new Date(item.timestamp).toLocaleString("ru-RU")}
                  </span>
                </div>

                <div className={styles.row}>
                  <span className={styles.key}>Решение:</span>
                  <span className={styles.value}>{ModerationActionLabels[item.action]}</span>
                </div>

                {item.reason && (
                  <div className={styles.row}>
                    <span className={styles.key}>Причина:</span>
                    <span className={styles.value}>{item.reason}</span>
                  </div>
                )}

                {item.comment && (
                  <div className={styles.row}>
                    <span className={styles.key}>Комментарий:</span>
                    <span className={styles.value}>{item.comment}</span>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
