// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FooterWrapper, NotesWrapper } from '../Wrappers';
import { ContentWrapper } from './Wrapper';
import { useModal } from '../../contexts/Modal';
import { useBalances } from '../../contexts/Balances';
import { useApi } from '../../contexts/Api';
import { useConnect } from '../../contexts/Connect';
import { BondInputWithFeedback } from '../../library/Form/BondInputWithFeedback';
import { useSubmitExtrinsic } from '../../library/Hooks/useSubmitExtrinsic';

export const Forms = () => {
  const { api, network }: any = useApi();
  const { units } = network;
  const { setStatus: setModalStatus, config, setResize }: any = useModal();
  const { id: poolId } = config;
  const { activeAccount } = useConnect();

  const { getBondOptions }: any = useBalances();
  const { freeToBond } = getBondOptions(activeAccount);

  // local bond value
  const [bond, setBond] = useState({ bond: freeToBond });

  // bond valid
  const [bondValid, setBondValid]: any = useState(true);

  // modal resize on form update
  useEffect(() => {
    setResize();
  }, [bond]);

  // tx to submit
  const tx = () => {
    let _tx = null;
    if (!bondValid) {
      return _tx;
    }

    // remove decimal errors
    const bondToSubmit = Math.floor(bond.bond * 10 ** units).toString();
    _tx = api.tx.nominationPools.join(bondToSubmit, poolId);

    return _tx;
  };

  const { submitTx, estimatedFee, submitting }: any = useSubmitExtrinsic({
    tx: tx(),
    from: activeAccount,
    shouldSubmit: bondValid,
    callbackSubmit: () => {
      setModalStatus(0);
    },
    callbackInBlock: () => {},
  });

  const TxFee = (
    <p>
      Estimated Tx Fee:
      {estimatedFee === null ? '...' : `${estimatedFee}`}
    </p>
  );

  return (
    <ContentWrapper>
      <div>
        <>
          <BondInputWithFeedback
            subject="pools"
            unbond={false}
            listenIsValid={setBondValid}
            defaultBond={freeToBond}
            setters={[
              {
                set: setBond,
                current: bond,
              },
            ]}
          />
          <NotesWrapper>{TxFee}</NotesWrapper>
        </>
      </div>
      <FooterWrapper>
        <div>
          <button
            type="button"
            className="submit"
            onClick={() => submitTx()}
            disabled={submitting || !bondValid}
          >
            <FontAwesomeIcon
              transform="grow-2"
              icon={faArrowAltCircleUp as IconProp}
            />
            Submit
            {submitting && 'ting'}
          </button>
        </div>
      </FooterWrapper>
    </ContentWrapper>
  );
};

export default Forms;