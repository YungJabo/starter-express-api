import express from "express";
import WebTorrent from "./app.js";
import cors from "cors";
import os from "os";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
console.log(WebTorrent);
const client = new WebTorrent();
const torrentId =
  "magnet:?xt=urn:btih:2d3b7c9bfb40bcce60486e746d1f9d7a42793b4b&dn=rutor.info_%D0%9C%D1%8F%D1%82%D0%B5%D0%B6%D0%BD%D0%B0%D1%8F+%D0%9B%D1%83%D0%BD%D0%B0%2C+%D1%87%D0%B0%D1%81%D1%82%D1%8C+1%3A+%D0%94%D0%B8%D1%82%D1%8F+%D0%BE%D0%B3%D0%BD%D1%8F+%2F+Rebel+Moon+-+Part+One%3A+A+Child+of+Fire+%282023%29+WEB-DLRip+720p+%D0%BE%D1%82+ExKinoRay+%7C+P&tr=udp://opentor.net:6969&tr=http://retracker.local/announce";

app.get("/", (req, res) => {
  const folderPath = path.join(os.tmpdir(), "/webtorrent");
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return;
    }
    files.forEach((file) => {
      console.log(file);
      const filePath = path.join(folderPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Ошибка удаления файла:", err);
          return;
        }

        console.log(`Файл ${file} успешно удален`);
      });
    });
  });
  res.send("ok");
});
app.get("/upload", (req, res) => {
  if (!client.get(torrentId)) {
    client.add(torrentId, (torrent) => {
      console.log(torrent.files[0].length);
      res.json({ size: torrent.files[0].length });
    });
  } else {
    console.log("klklkl");
    res.json({ size: null });
  }
});

app.get("/video", (req, res) => {
  const range = req.headers.range;
  const file = client.get(torrentId).files[0];
  const startParsed = range.replace(/bytes=/, "").split("-");
  const start = parseInt(startParsed);
  let chunksize = 11 ** 6;
  const end = Math.min(start + chunksize, file.length - 1);
  if (start + chunksize >= end) {
    chunksize = end - start;
    console.log(chunksize);
  }
  console.log(start, end, chunksize, file.length);
  const head = {
    "Content-Range": `bytes ${start}-${end}/${file.length}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunksize + 1,
    "Content-Type": "video/mkv",
  };
  res.writeHead(206, head);
  const stream = file.createReadStream({
    start: start,
    end: end,
  });
  stream.pipe(res);
  stream.on("error", (err) => {
    console.error("Error in stream:", err);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
