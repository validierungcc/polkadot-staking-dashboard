// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

export interface PoolAccountProps {
  label?: string;
  pool?: any;
  filled?: boolean;
  fontSize?: string;
  canClick: any;
  onClick?: () => void;
  value?: string;
  title?: string | undefined;
}

export interface WrapperProps {
  $canClick: boolean;
  $filled: boolean;
  fontSize: string;
}
