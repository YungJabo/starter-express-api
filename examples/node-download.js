import WebTorrent from "../index.js";
import fs from "fs";
console.log(WebTorrent);

const client = new WebTorrent();

const torrentId =
  "magnet:?xt=urn:btih:dcbfc87e431767b883f034f1418de0f6ff11a356&tr=udp%3A%2F%2Fopentor.net%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fatrack.pow7.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fpow7.com%3A6969%2Fannounce&tr=http%3A%2F%2Fsecure.pow7.com%2Fannounce&tr=http%3A%2F%2Ft1.pow7.com%2Fannounce&tr=udp%3A%2F%2Ft2.pow7.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=http%3A%2F%2Fbt2.t-ru.org%2Fann%3Fmagnet";

console.log("torrentId:\t", torrentId);

client.add(torrentId, (torrent) => {
  const files = torrent.files;
  let length = files.length;
  // Stream each file to the disk
  console.log(files);
});
