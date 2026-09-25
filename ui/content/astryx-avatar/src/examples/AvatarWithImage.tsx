// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@astryxdesign/core/Avatar';
import {Stack} from '@astryxdesign/core/Layout';

export default function AvatarWithImage() {
  return (
    <Stack direction="horizontal" gap={4} vAlign="center">
      <Avatar
        src={new URL("../../../../_sources/astryx/template-assets/DATA-Ami-Pena.png", import.meta.url).href}
        name="Ami Pena"
        size="xsm"
      />
      <Avatar
        src={new URL("../../../../_sources/astryx/template-assets/DATA-Ana-Thomas.png", import.meta.url).href}
        name="Ana Thomas"
        size="md"
      />
      <Avatar
        src={new URL("../../../../_sources/astryx/template-assets/DATA-Daniela-Gimenez.png", import.meta.url).href}
        name="Daniela Gimenez"
        size="lg"
      />
      <Avatar
        src={new URL("../../../../_sources/astryx/template-assets/DATA-Gabriela-Fernandez.png", import.meta.url).href}
        name="Gabriela Fernandez"
        size="xl"
      />
    </Stack>
  );
}
