import { ActionIcon, Modal } from '@lobehub/ui';
import { Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useMergeState from 'use-merge-value';

import { DESKTOP_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import { useSessionStore } from '@/store/session';

const Inner = dynamic(() => import('./Inner'));
interface ShareButtonProps {
  mobile?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const ShareButton = memo<ShareButtonProps>(({ mobile, setOpen, open }) => {
  const [isModalOpen, setIsModalOpen] = useMergeState(false, {
    defaultValue: false,
    onChange: setOpen,
    value: open,
  });
  const { t } = useTranslation('common');
  const [shareLoading] = useSessionStore((s) => [s.shareLoading]);

  return (
    <>
      {!mobile && (
        <ActionIcon
          icon={Share2}
          loading={shareLoading}
          onClick={() => setIsModalOpen(true)}
          size={DESKTOP_HEADER_ICON_SIZE}
          title={t('share')}
        />
      )}
      <Modal
        centered={false}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={t('share')}
      >
        <Inner />
      </Modal>
    </>
  );
});

export default ShareButton;
