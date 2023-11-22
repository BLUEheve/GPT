import { Button, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import DevModal from '@/features/PluginDevModal';
import { usePluginStore } from '@/store/plugin';
import { pluginSelectors } from '@/store/plugin/selectors';

import { useStore } from '../store';

const MarketList = memo<{ id: string }>(({ id }) => {
  const { t } = useTranslation('plugin');

  const [showModal, setModal] = useState(false);

  const [toggleAgentPlugin, hasPlugin] = useStore((s) => [s.toggleAgentPlugin, !!s.config.plugins]);
  const plugins = useStore((s) => s.config.plugins || []);

  const [useFetchPluginList, fetchPluginManifest, deleteCustomPlugin, updateCustomPlugin] =
    usePluginStore((s) => [
      s.useFetchPluginStore,
      s.installPlugin,
      s.deleteCustomPlugin,
      s.updateCustomPlugin,
    ]);

  const pluginManifestLoading = usePluginStore((s) => s.pluginManifestLoading, isEqual);
  const devPlugin = usePluginStore(pluginSelectors.getDevPluginById(id), isEqual);

  useFetchPluginList();

  return (
    <>
      <DevModal
        mode={'edit'}
        onDelete={() => {
          deleteCustomPlugin(id);
          toggleAgentPlugin(id, false);
        }}
        onOpenChange={setModal}
        onSave={(value) => {
          updateCustomPlugin(id, value);
        }}
        open={showModal}
        value={devPlugin}
      />

      <Flexbox align={'center'} gap={8} horizontal>
        <Switch
          checked={
            // 如果在加载中，说明激活了
            pluginManifestLoading[id] || !hasPlugin ? false : plugins.includes(id)
          }
          loading={pluginManifestLoading[id]}
          onChange={(checked) => {
            toggleAgentPlugin(id);
            if (checked) {
              fetchPluginManifest(id);
            }
          }}
        />
        <Button
          onClick={() => {
            setModal(true);
          }}
        >
          {t('list.item.local.config')}
        </Button>
      </Flexbox>
    </>
  );
});

export default MarketList;
