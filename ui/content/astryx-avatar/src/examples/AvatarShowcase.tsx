// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar, AvatarStatusDot} from '@astryxdesign/core/Avatar';
import {Stack} from '@astryxdesign/core/Layout';

export default function AvatarShowcase() {
  return (
    <Stack direction="horizontal" gap={4} vAlign="center">
      <Avatar
        src={new URL("../../../../_sources/astryx/template-assets/DATA-Ana-Thomas.png", import.meta.url).href}
        name="Ana Thomas"
        size="xl"
        status={<AvatarStatusDot variant="success" label="Online" />}
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
      <Avatar
        src={new URL("../../../../_sources/astryx/template-assets/DATA-Nam-Tran.png", import.meta.url).href}
        name="Nam Tran"
        size="xl"
        status={<AvatarStatusDot variant="error" label="Busy" />}
      />
    </Stack>
  );
}
