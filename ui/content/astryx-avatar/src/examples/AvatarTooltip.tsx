// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@astryxdesign/core/Avatar';
import {Stack} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';

export default function AvatarTooltip() {
  return (
    <Stack direction="vertical" gap={5}>
      <Stack direction="vertical" gap={2}>
        <Text type="supporting" color="secondary">
          Hover or focus to reveal each name
        </Text>
        <Stack direction="horizontal" gap={4} vAlign="center">
          <Avatar
            src={new URL("../../../../_sources/astryx/template-assets/DATA-Ana-Thomas.png", import.meta.url).href}
            name="Ana Thomas"
            size="xl"
          />
          <Avatar
            src={new URL("../../../../_sources/astryx/template-assets/DATA-Drew-Young.png", import.meta.url).href}
            name="Drew Young"
            size="xl"
          />
          <Avatar
            src={new URL("../../../../_sources/astryx/template-assets/DATA-Jihoo-Song.png", import.meta.url).href}
            name="Jihoo Song"
            size="xl"
          />
        </Stack>
      </Stack>
      <Stack direction="vertical" gap={2}>
        <Text type="supporting" color="secondary">
          Custom tooltip text
        </Text>
        <Avatar
          src={new URL("../../../../_sources/astryx/template-assets/DATA-Itai-Jordaan.png", import.meta.url).href}
          name="Itai Jordaan"
          size="xl"
          tooltip="Itai Jordaan · Engineering Lead"
        />
      </Stack>
    </Stack>
  );
}
