/**
 * Non-translatable content: photos and paint colours.
 * Every photo here is a free-licence Unsplash STAND-IN — replace with
 * Eco Pintura's own photography before launch (shot list in Figma › SEO & Copy).
 */
import barSantGervasi from "@/assets/photos/bar-sant-gervasi.jpg";
import botigaPobleSec from "@/assets/photos/botiga-poble-sec.jpg";
import campNouCubierta from "@/assets/photos/camp-nou-cubierta.jpg";
import campNouDia from "@/assets/photos/camp-nou-dia.jpg";
import campNouGrada from "@/assets/photos/camp-nou-grada-equipo.jpg";
import escaleraGracia from "@/assets/photos/escalera-gracia.jpg";
import fachadaRosa from "@/assets/photos/fachada-rosa.jpg";
import fachadaSantAntoni from "@/assets/photos/fachada-sant-antoni.jpg";
import pisoEixample from "@/assets/photos/piso-eixample.jpg";
import rodilloMacro from "@/assets/photos/rodillo-macro.jpg";
import zoom1 from "@/assets/photos/zoom-1-canto.jpg";
import zoom2 from "@/assets/photos/zoom-2-piso.jpg";
import zoom3 from "@/assets/photos/zoom-3-edificio.jpg";
import zoom4 from "@/assets/photos/zoom-4-estadio.jpg";

export const photos = {
  heroRoller: rodilloMacro,
  campNouCrew: campNouGrada,
  campNouRoof: campNouCubierta,
  pisoEixample,
};

/**
 * Long Zoom frames, outermost last. `inset` places the previous (smaller)
 * frame inside this one, in normalized viewport coordinates: x/y = top-left,
 * s = size relative to this frame (same aspect ratio as the stage).
 */
export const zoomFrames = [
  { src: zoom1, inset: null },
  { src: zoom2, inset: { x: 0.47, y: 0.47, s: 0.27 } },
  { src: zoom3, inset: { x: 0.37, y: 0.31, s: 0.27 } },
  { src: zoom4, inset: { x: 0.38, y: 0.4, s: 0.27 } },
] as const;

export const projectPhotos: Record<string, typeof rodilloMacro> = {
  "camp-nou": campNouDia,
  "sant-antoni": fachadaSantAntoni,
  gracia: escaleraGracia,
  eixample: pisoEixample,
  "poble-sec": botigaPobleSec,
  "sant-gervasi": barSantGervasi,
  "eixample-rosa": fachadaRosa,
};

/** Fan deck: one paint per service (ids match messages › services.items[].id). */
export const deckColours: Record<
  string,
  { bg: string; text: "ink" | "paper" }
> = {
  pisos: { bg: "var(--deck-blanco)", text: "ink" },
  comunidades: { bg: "var(--deck-escalera)", text: "paper" },
  fachadas: { bg: "var(--deck-ocre)", text: "ink" },
  comercios: { bg: "var(--deck-botiga)", text: "paper" },
  "obra-grande": { bg: "var(--deck-naranja)", text: "ink" },
  especiales: { bg: "var(--deck-antracita)", text: "paper" },
};
