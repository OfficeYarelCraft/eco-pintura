/**
 * Generates the favicon set from the logo's leaf-O (see Figma › System › Favicon).
 * Optical sizes: 16px keeps 3 veins, 32px keeps 4, 180/512px keep all 6.
 *   node scripts/generate-icons.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const VEINS = [
  [433.7, 57.4, 401.5, 166.6],
  [427.9, 77.1, 469.8, 71.2],
  [420.8, 101.1, 484.6, 117.0],
  [413.7, 125.1, 463.4, 158.6],
  [407.3, 146.9, 425.3, 173.6],
  [424.0, 90.2, 374.0, 76.3],
];
const LEAF = { cx: 423.8, cy: 112, r: 62 };

function leaf({
  veins,
  stroke,
  bg = null,
  pad = 0,
  circle = "#2F9E48",
  vein = "#EEEEE8",
}) {
  const c = 50;
  const r = 50 - pad;
  const map = (x, y) => [
    (c + ((x - LEAF.cx) / LEAF.r) * r).toFixed(2),
    (c + ((y - LEAF.cy) / LEAF.r) * r).toFixed(2),
  ];
  const paths = veins
    .map((i) => {
      const [x1, y1, x2, y2] = VEINS[i];
      const a = map(x1, y1);
      const b = map(x2, y2);
      return `<path d="M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}"/>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${bg ? `<rect width="100" height="100" fill="${bg}"/>` : ""}<circle cx="50" cy="50" r="${r}" fill="${circle}"/><g fill="none" stroke="${vein}" stroke-width="${stroke}" stroke-linecap="round">${paths}</g></svg>`;
}

const png = (svg, size) =>
  sharp(Buffer.from(svg))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

/** Minimal ICO container with embedded PNGs. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

const s16 = leaf({ veins: [0, 2, 5], stroke: 9.5 });
const s32 = leaf({ veins: [0, 1, 2, 5], stroke: 7.5 });
const sFull = (bg, pad) =>
  leaf({ veins: [0, 1, 2, 3, 4, 5], stroke: 4.6, bg, pad });

mkdirSync("public/icons", { recursive: true });
writeFileSync("app/icon.svg", s32);
writeFileSync(
  "app/favicon.ico",
  ico([
    { size: 16, buf: await png(s16, 16) },
    { size: 32, buf: await png(s32, 32) },
    { size: 48, buf: await png(s32, 48) },
  ]),
);
writeFileSync("app/apple-icon.png", await png(sFull("#101813", 14), 180));
writeFileSync(
  "public/icons/icon-192.png",
  await png(sFull("#101813", 12), 192),
);
writeFileSync(
  "public/icons/icon-512.png",
  await png(sFull("#101813", 12), 512),
);
writeFileSync(
  "public/icons/icon-512-maskable.png",
  await png(sFull("#EEEEE8", 22), 512),
);
console.log("icons written");
