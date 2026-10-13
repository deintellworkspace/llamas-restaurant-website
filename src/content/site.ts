// Business details as printed on the Llamas menu (IMG_8632). Public listings
// conflict (one shows Suite 3 and (916) 566-9405); the printed values are used
// until the owner confirms. Hours, ordering link and reservations are unknown,
// so the site does not show them.
export const SITE = {
  name: "Llamas Restaurant",
  tagline: "Peruvian · Sushi Bar · Mexican",
  street: "5825 Manzanita Ave, Suite 2",
  city: "Carmichael",
  region: "CA",
  postal: "95608",
  phoneDisplay: "(916) 334-7122",
  phoneE164: "+19163347122",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Llamas Restaurant, 5825 Manzanita Ave Suite 2, Carmichael, CA 95608"),
  orderUrl: null as string | null, // add only a real, owner-confirmed ordering link
};
export const TEL = `tel:${SITE.phoneE164}`;
export const ADDRESS_ONE_LINE = `${SITE.street}, ${SITE.city}, ${SITE.region} ${SITE.postal}`;
