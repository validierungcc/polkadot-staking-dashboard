// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { IdentitiesContextInterface } from './types';

export const defaultIdentitiesContext: IdentitiesContextInterface = {
  // eslint-disable-next-line
  fetchIdentitiesMetaBatch: (k, v, r) => {},
  meta: {},
};
