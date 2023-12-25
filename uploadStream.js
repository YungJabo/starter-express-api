import WebTorrent from "./index.js";
function uploadStream() {
  const file = torrent.files[0];

  const range = req.headers.range;
  console.log(range);
  const [startParsed, endParsed] = range.replace(/bytes=/, "").split("-");
  const start = parseInt(startParsed);
  const end = endParsed ? parseInt(endParsed) : file.length - 1;
  const chunksize = 10485760;
  console.log(start, end);
  const head = {
    "Content-Range": `bytes ${start}-${end}/${file.length}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunksize,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, head);
  const stream = file.createReadStream({
    start,
    end,
  });
  stream.pipe(res);
  stream.on("error", (err) => {
    console.error("Error in stream:", err);
    res.end();
  });
}
