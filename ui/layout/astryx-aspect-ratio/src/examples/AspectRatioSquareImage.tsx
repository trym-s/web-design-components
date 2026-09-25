// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {Center} from '@astryxdesign/core/Center';

export default function AspectRatioSquareImage() {
  return (
    <Center width={300}>
      <AspectRatio ratio={1} fit="cover">
        <img
          src={new URL("../../../../_sources/astryx/template-assets/light-home-square-1.png", import.meta.url).href}
          alt="1:1 square"
        />
      </AspectRatio>
    </Center>
  );
}
