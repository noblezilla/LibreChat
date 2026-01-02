import { useCallback } from 'react';
import { EModelEndpoint, getResponseSender } from 'librechat-data-provider';
import type { TEndpointOption, TEndpointsConfig } from 'librechat-data-provider';
import { useGetEndpointsQuery } from '~/data-provider';
import { ASSISTANT_MODEL_LABEL } from '~/constants/branding';

export default function useGetSender() {
  const { data: endpointsConfig = {} as TEndpointsConfig } = useGetEndpointsQuery();
  return useCallback(
    (endpointOption: TEndpointOption) => {
      const { modelDisplayLabel } = endpointsConfig?.[endpointOption.endpoint ?? ''] ?? {};
      const shouldOverrideLabel =
        endpointOption.endpoint != null &&
        [
          EModelEndpoint.openAI,
          EModelEndpoint.bedrock,
          EModelEndpoint.gptPlugins,
          EModelEndpoint.azureOpenAI,
          EModelEndpoint.chatGPTBrowser,
        ].includes(endpointOption.endpoint as EModelEndpoint);
      const modelLabel = shouldOverrideLabel ? ASSISTANT_MODEL_LABEL : '';
      return getResponseSender({ ...endpointOption, modelDisplayLabel, modelLabel });
    },
    [endpointsConfig],
  );
}
