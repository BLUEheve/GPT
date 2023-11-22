import { BackBottom } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ReactNode, memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import SafeSpacing from '@/components/SafeSpacing';

import ChatList from './ChatList';
import ChatScrollAnchor from './ScrollAnchor';
import { usePluginsInit } from './usePluginsInit';

const useStyles = createStyles(
  ({ css, responsive, stylish }) => css`
    overflow: hidden scroll;
    height: 100%;
    ${responsive.mobile} {
      ${stylish.noScrollbar}
      width: 100vw;
    }
  `,
);

interface ConversationProps {
  chatInput: ReactNode;
  mobile?: boolean;
}

const Conversation = memo<ConversationProps>(({ mobile, chatInput }) => {
  const ref = useRef(null);
  const { t } = useTranslation('chat');
  const { styles } = useStyles();

  // fetch plugin list and init plugins
  usePluginsInit();

  return (
    <Flexbox flex={1} style={{ position: 'relative' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div className={styles} ref={ref}>
          {!mobile && <SafeSpacing />}
          <ChatList />
          <ChatScrollAnchor />
        </div>
        <BackBottom target={ref} text={t('backToBottom')} />
      </div>
      {chatInput}
    </Flexbox>
  );
});

export default Conversation;
