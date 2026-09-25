// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar, AvatarStatusDot} from '@astryxdesign/core/Avatar';
import {Stack} from '@astryxdesign/core/Layout';

export default function AvatarWithStatus() {
  return (
    <Stack direction="horizontal" gap={4} vAlign="center">
      <Avatar
        src={new URL("../../../../_sources/astryx/template-assets/DATA-Itai-Jordaan.png", import.meta.url).href}
        name="Itai Jordaan"
        size="xl"
        status={<AvatarStatusDot variant="success" label="Online" />}
      />
      <Avatar
        src={new URL("../../../../_sources/astryx/template-assets/DATA-Margot-Schroder.png", import.meta.url).href}
        name="Margot Schroder"
        size="xl"
        status={<AvatarStatusDot variant="neutral" label="Offline" />}
      />
      <Avatar
        src={new URL("../../../../_sources/astryx/template-assets/DATA-Pablo-Morales.png", import.meta.url).href}
        name="Pablo Morales"
        size="xl"
        status={<AvatarStatusDot variant="error" label="Busy" />}
      />
    </Stack>
  );
}
