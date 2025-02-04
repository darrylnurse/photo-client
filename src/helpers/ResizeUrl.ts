export default function resizeUrl(url : string, resize: "normal" | "super" = "normal") : string {
    if(
        !url ||
        !url.includes("gleam-photo-bucket")
    ) return "/mysterious-fallback.jpg";
    const finalSlash : number = url.lastIndexOf('/');
    const urlEnd : string = url.slice(finalSlash + 1);
    const urlStart : string  = url.slice(0, finalSlash + 1);
    return urlStart + (resize === "normal" ? "resized-" : "super-resized-") + urlEnd;
}