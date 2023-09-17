function convertMS(ms: number) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return { d, h, m, s };
}

function convertMSString(ms: number) {
    const { d, h, m, s } = convertMS(ms);
    return d + " days, " + h + " hours, " + m + " minutes, " + s + " seconds.";
}

function convertMSHoursCutted(ms: number) {
    const { d, h, m, s } = convertMS(ms);

    return `${h !== 0 ? `${h}:` : ""}${m}:${s}`;
    // return `${h !== 0 ? `${h} Hours, ` : ""}${m !== 0 ? `${m} Minutes, ` : ""}${
    //     s !== 0 ? `${s} Seconds` : ""
    // }`;
}

export { convertMS, convertMSString, convertMSHoursCutted };
