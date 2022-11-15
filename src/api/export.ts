import { readTextFile, writeStream } from './../services/fs';
import { logError } from '../services/logging';
import * as fs from 'promise-fs';
import { typedIpcRenderer } from '../types/ipc';

export const exists = (path: string) => {
    return fs.existsSync(path);
};

export const checkExistsAndCreateCollectionDir = async (dirPath: string) => {
    if (!fs.existsSync(dirPath)) {
        await fs.mkdir(dirPath);
    }
};

export const checkExistsAndRename = async (
    oldDirPath: string,
    newDirPath: string
) => {
    if (fs.existsSync(oldDirPath)) {
        await fs.rename(oldDirPath, newDirPath);
    }
};

export const saveStreamToDisk = (
    filePath: string,
    fileStream: ReadableStream<any>
) => {
    writeStream(filePath, fileStream);
};

export const saveFileToDisk = async (path: string, fileData: any) => {
    await fs.writeFile(path, fileData);
};

export const getExportRecord = async (filePath: string) => {
    try {
        if (!fs.existsSync(filePath)) {
            return null;
        }
        const recordFile = await readTextFile(filePath);
        return recordFile;
    } catch (e) {
        logError(e, 'error while selecting files');
    }
};

export const setExportRecord = async (filePath: string, data: string) => {
    await fs.writeFile(filePath, data);
};

export const registerResumeExportListener = (resumeExport: () => void) => {
    typedIpcRenderer.removeAllListeners('resume-export');
    typedIpcRenderer.on('resume-export', () => resumeExport());
};

export const registerStopExportListener = (abortExport: () => void) => {
    typedIpcRenderer.removeAllListeners('stop-export');
    typedIpcRenderer.on('stop-export', () => abortExport());
};

export const registerPauseExportListener = (pauseExport: () => void) => {
    typedIpcRenderer.removeAllListeners('pause-export');
    typedIpcRenderer.on('pause-export', () => pauseExport());
};

export const registerRetryFailedExportListener = (
    retryFailedExport: () => void
) => {
    typedIpcRenderer.removeAllListeners('retry-export');
    typedIpcRenderer.on('retry-export', () => retryFailedExport());
};
