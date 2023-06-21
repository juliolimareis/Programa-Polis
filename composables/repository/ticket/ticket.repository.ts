interface TicketSearch {
   size: number,
   offset: number,
   total: number,
   rows: Ticket[]
}

export const useTicket = () => {
  const api = useApi();

  function fetchMy(){
    return api.get<Ticket>("/ticket/profile");
  }

  function search(params?: { search?: string, offset?: number, size?: number }){
    return api.get<TicketSearch>("/ticket", { params });
  }

  function fetchPendent(){
    return api.get<TicketList[]>("/ticket/pendent");
  }

  function dispatch(ticket: CreateTicket){
    return api.post<Ticket>("/ticket", ticket);
  }

  function dispatchPendent({ idTicket, desc }: { idTicket: number, desc: string }){
    return api.post<{ message: string }>(`/ticket/pendent/${idTicket}`, { desc });
  }

  return { dispatch, fetchMy, fetchPendent, dispatchPendent, search };
};