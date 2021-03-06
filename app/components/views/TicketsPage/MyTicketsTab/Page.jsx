import { FormattedMessage as T } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";
import {
  LoadingMoreTicketsIndicator,
  NoMoreTicketsIndicator,
  NoTicketsIndicator
} from "indicators";
import { TxHistory, Subtitle, Tooltip } from "shared";
import { EyeFilterMenu } from "buttons";
import style from "./MyTicketsTab.module.css";

const subtitleMenu = ({
  sortTypes,
  ticketTypes,
  selectedSortOrderKey,
  selectedTicketTypeKey,
  onChangeSelectedType,
  onChangeSortType
}) => (
  <div className={style.ticketsButtons}>
    <Tooltip
      tipWidth={300}
      text={<T id="tickets.sortby.tooltip" m="Sort By" />}>
      <EyeFilterMenu
        labelKey="label"
        keyField="value"
        options={sortTypes}
        selected={selectedSortOrderKey}
        onChange={onChangeSortType}
        type="sortBy"
      />
    </Tooltip>
    <Tooltip
      tipWidth={300}
      text={<T id="tickets.tickettypes.tooltip" m="Ticket Status" />}>
      <EyeFilterMenu
        labelKey="label"
        keyField="key"
        options={ticketTypes}
        selected={selectedTicketTypeKey}
        onChange={onChangeSelectedType}
      />
    </Tooltip>
  </div>
);

const TicketListPage = ({
  tickets,
  noMoreTickets,
  getTickets,
  onChangeSortType,
  onChangeSelectedType,
  selectedSortOrderKey,
  selectedTicketTypeKey,
  sortTypes,
  ticketTypes,
  tsDate
}) => {
  const isOverview = window.innerWidth < 768; // small width
  return (
    <InfiniteScroll
      hasMore={!noMoreTickets}
      loadMore={() => getTickets(true)}
      initialLoad={!noMoreTickets}
      useWindow={false}
      threshold={90}>
      <Subtitle
        title={<T id="mytickets.subtitle" m="My Tickets" />}
        className={style.subtitle}
        children={subtitleMenu({
          sortTypes,
          ticketTypes,
          selectedSortOrderKey,
          selectedTicketTypeKey,
          onChangeSelectedType,
          onChangeSortType
        })}
      />
      {tickets.length > 0 && (
        <>
          <div className={style.tableHeader}>
            <div>
              <T id="tickets.table.header.status" m="Ticket Status" />
            </div>
            <div>
              <T id="tickets.table.header.price" m="Price" />
            </div>
            <div>
              <T id="tickets.table.header.reward" m="Reward" />
            </div>
            <div>
              <T id="tickets.table.header.votetime" m="Vote Time" />
            </div>
            <div>
              <T id="tickets.table.header.account" m="Account" />
            </div>
            <div>
              <T id="tickets.table.header.purchased" m="Purchased" />
            </div>
          </div>
          <TxHistory
            {...{
              transactions: tickets,
              tsDate,
              mode: "stake",
              overview: isOverview
            }}
          />
        </>
      )}
      {!noMoreTickets ? (
        <LoadingMoreTicketsIndicator />
      ) : tickets.length > 0 ? (
        <NoMoreTicketsIndicator />
      ) : (
        <NoTicketsIndicator />
      )}
    </InfiniteScroll>
  );
};

export default TicketListPage;
