import { createClientsHeader } from "./createHeader.js";
import { createClientsSection } from "./createClienstSection.js";
import { getClients } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { sortTable } from "./sortClientTable.js";
import { searchClients } from "./searchClient.js";

const createApp = async () => {
  const header = createClientsHeader();
  const clientSection = createClientsSection();
  document.body.append(header, clientSection.main);
  const preloader = document.querySelector(".preloader");
  const tebleWrapper = document.querySelector(".clients__wrapper");

  try {
    tebleWrapper.style.overflow = "visible";
    const clients = await getClients();
    searchClients(clients);

    for (const client of clients) {
      setTimeout(
        () =>
          document
            .querySelector(".clients__tbody")
            .append(createClientItem(client)),
        1500
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => preloader.remove(), 1500);
    setTimeout(() => (tebleWrapper.style.overflow = "auto"), 1500);
  }
};

createApp();
document.addEventListener("DOMContentLoaded", sortTable);
