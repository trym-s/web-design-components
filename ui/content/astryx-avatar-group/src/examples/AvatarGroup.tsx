// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@astryxdesign/core/Avatar';
import {AvatarGroup, AvatarGroupOverflow} from '@astryxdesign/core/AvatarGroup';
import {Stack} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';

const USERS = [
  {
    name: 'Ami Pena',
    src: new URL("../../../../_sources/astryx/template-assets/DATA-Ami-Pena.png", import.meta.url).href,
  },
  {
    name: 'Drew Young',
    src: new URL("../../../../_sources/astryx/template-assets/DATA-Drew-Young.png", import.meta.url).href,
  },
  {
    name: 'Gabriela Fernandez',
    src: new URL("../../../../_sources/astryx/template-assets/DATA-Gabriela-Fernandez.png", import.meta.url).href,
  },
  {
    name: 'Jihoo Song',
    src: new URL("../../../../_sources/astryx/template-assets/DATA-Jihoo-Song.png", import.meta.url).href,
  },
  {
    name: 'Nam Tran',
    src: new URL("../../../../_sources/astryx/template-assets/DATA-Nam-Tran.png", import.meta.url).href,
  },
];

export default function AvatarGroupBlock() {
  return (
    <Stack direction="vertical" gap={8}>
      <Stack direction="vertical" gap={3}>
        <Text type="supporting" color="secondary">
          Team members
        </Text>
        <AvatarGroup size="lg">
          {USERS.map(user => (
            <Avatar key={user.name} src={user.src} name={user.name} />
          ))}
          <AvatarGroupOverflow count={3} />
        </AvatarGroup>
      </Stack>
      <Stack direction="vertical" gap={3}>
        <Text type="supporting" color="secondary">
          Larger group
        </Text>
        <AvatarGroup size="lg">
          {USERS.slice(0, 3).map(user => (
            <Avatar key={user.name} src={user.src} name={user.name} />
          ))}
          <AvatarGroupOverflow count={8} />
        </AvatarGroup>
      </Stack>
    </Stack>
  );
}
