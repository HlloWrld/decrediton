import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

import * as vspa from "actions/VSPActions";
import * as ca from "actions/ControlActions.js";
import * as sel from "selectors";

export const usePurchaseTab = () => {
  const spvMode = useSelector(sel.isSPV);
  const blocksNumberToNextTicket = useSelector(sel.blocksNumberToNextTicket);
  const sidebarOnBottom = useSelector(sel.sidebarOnBottom);
  const isWatchingOnly = useSelector(sel.isWatchingOnly);
  const spendingAccounts = useSelector(sel.spendingAccounts);
  const defaultSpendingAccount = useSelector(sel.defaultSpendingAccount);
  const ticketPrice = useSelector(sel.ticketPrice);
  const availableVSPs = useSelector(sel.getAvailableVSPs);
  const availableVSPsError = useSelector(sel.getDiscoverAvailableVSPError);
  const ticketAutoBuyerRunning = useSelector(sel.getTicketAutoBuyerRunning);

  const buyerVSP = useSelector(sel.buyerVSP);
  const buyerBalanceToMantain = useSelector(sel.buyerBalanceToMantain);
  const buyerAccount = useSelector(sel.buyerAccount);

  const dispatch = useDispatch();
  const discoverAvailableVSPs = useCallback(() => dispatch(vspa.discoverAvailableVSPs()), [
    dispatch
  ]);
  const onEnableTicketAutoBuyer = useCallback((passphrase, account, balanceToMaintain, vsp) =>
    dispatch(ca.startTicketBuyerV3Attempt(
      passphrase,
      account,
      balanceToMaintain,
      vsp)
    ),
    [dispatch]
  );
  const onDisableTicketAutoBuyer = useCallback(
    () => dispatch(ca.ticketBuyerCancel()),
    [dispatch]
  );
  const getTicketStatus = useCallback((host, tickethash, passphrase) =>
    dispatch(vspa.getVSPTicketStatus(host, tickethash, passphrase)),
    [dispatch]
  );

  const getVSPTicketsByFeeStatus = (feeStatus) => {
    dispatch(vspa.getVSPTicketsByFeeStatus(feeStatus));
  };

  return {
    spvMode,
    blocksNumberToNextTicket,
    sidebarOnBottom,
    isWatchingOnly,
    spendingAccounts,
    defaultSpendingAccount,
    discoverAvailableVSPs,
    ticketPrice,
    onEnableTicketAutoBuyer,
    availableVSPs,
    availableVSPsError,
    onDisableTicketAutoBuyer,
    getTicketStatus,
    ticketAutoBuyerRunning,
    buyerVSP,
    buyerAccount,
    buyerBalanceToMantain,
    getVSPTicketsByFeeStatus
  };
};
