import Axios from "axios";
import fs from "node:fs";
import path from "node:path";
import { Controller } from "../services/Anroll.js";

const baseUrl = Controller.m3u8()
const assetsPath = path.join('src', 'assets');

export async function fetchContent(url) {
    const response = await Axios.get(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            Referer: "https://www.anroll.net/",
        },
        responseType: 'text'
    });
    if (response.status !== 200) {
        throw new Error('Failed to fetch content');
    }
    return response.data;
}

export async function handleEpisode(name, episode, endpoint) {
    const filePath = path.join(assetsPath, name, `${episode}.m3u8`);
    if (fs.existsSync(filePath)) return true;

    try {
        const content = await fetchContent(`${baseUrl}/${endpoint}`);
        saveContent(name, episode, content);
        return true;
    } catch (e) {
        console.error('Episode not found', e);
        return false;
    }
}

export async function handleSpecificEpisode(name, episode) {
    const filePath = path.join(assetsPath, name, `${episode}.m3u8`);
    if (fs.existsSync(filePath)) return;

    try {
        const content = await fetchContent(`${baseUrl}/animes/${name}/${episode}.mp4/media-1/stream.m3u8`);
        saveContent(name, episode, content);
    } catch (e) {
        console.error('Episode not found', e);
        throw e;
    }
}

export function saveContent(name, episode, content) {
    const directoryPath = path.join(assetsPath, name);
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    fs.writeFileSync(`${directoryPath}/${episode}.m3u8`, content);
}
