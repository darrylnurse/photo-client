export default function getCameraImage(name : string) : string {

    const lastHyphen = name.lastIndexOf('-');

    let fileName = name
        .toLowerCase()
        .replace(/\s/g, '');

    if(lastHyphen !== -1) {
        fileName = fileName.slice(lastHyphen);
    }
    
    return `/${fileName}.png`;
}