export default function BratVideoGenerator() {
  return (
    <div className="video-generator-embed-shell">
      <iframe
        className="brat-video-generator-iframe"
        src="/brat-video-generator-embed.html"
        title="Brat Video Generator"
        loading="eager"
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </div>
  );
}
