import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "../trips/TripsClient";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage =  async() => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Não Autorizado"
                    subtitle="Faça o login, por favor"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({authorId:currentUser.id});

    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="Nenhuma reserva encontrada"
                    subtitle="Parece que você não possui nenhuma reserva em suas propriedades."
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default ReservationsPage;