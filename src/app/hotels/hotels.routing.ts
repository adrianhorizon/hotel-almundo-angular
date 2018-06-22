import { HotelsListComponent } from "./hotels-list/hotels-list.component";
import { HotelsDetailsComponent } from "./hotels-details/hotels-details.component";

export const HOTELS_ROUTES = [
  { path: '', component: HotelsListComponent },
  { path: ':id', component: HotelsDetailsComponent }
];
