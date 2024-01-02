import {
    registerUpdateEventListener,
    reloadWindow,
    sendNotification,
    updateAndRestart,
    skipAppUpdate,
    muteUpdateNotification,
    registerForegroundEventListener,
} from './api/system';
import {
    showUploadDirsDialog,
    showUploadFilesDialog,
    showUploadZipDialog,
    getPendingUploads,
    setToUploadFiles,
    getElectronFilesFromGoogleZip,
    setToUploadCollection,
} from './api/upload';
import {
    registerWatcherFunctions,
    addWatchMapping,
    removeWatchMapping,
    updateWatchMappingSyncedFiles,
    updateWatchMappingIgnoredFiles,
    getWatchMappings,
} from './api/watch';
import { getEncryptionKey, setEncryptionKey } from './api/safeStorage';
import { clearElectronStore } from './api/electronStore';
import {
    openDiskCache,
    deleteDiskCache,
    getCacheDirectory,
    setCustomCacheDirectory,
} from './api/cache';
import {
    checkExistsAndCreateDir,
    saveStreamToDisk,
    saveFileToDisk,
    exists,
} from './api/export';
import {
    selectDirectory,
    logToDisk,
    openLogDirectory,
    getSentryUserID,
    getAppVersion,
    openDirectory,
    updateOptOutOfCrashReports,
    getPlatform,
} from './api/common';
import {
    isFolder,
    getDirFiles,
    moveFile,
    deleteFolder,
    rename,
    readTextFile,
    deleteFile,
} from './api/fs';
import { convertToJPEG, generateImageThumbnail } from './api/imageProcessor';
import { setupLogging } from './utils/logging';
import {
    setupRendererProcessStatsLogger,
    logRendererProcessMemoryUsage,
} from './utils/processStats';
import { runFFmpegCmd } from './api/ffmpeg';
import { computeImageEmbedding, computeTextEmbedding } from './api/clip';
const { contextBridge } = require('electron');

setupLogging();
setupRendererProcessStatsLogger();

contextBridge.exposeInMainWorld('ElectronAPIs', {
    exists,
    checkExistsAndCreateDir,
    saveStreamToDisk,
    saveFileToDisk,
    selectDirectory,
    clearElectronStore,
    sendNotification,
    reloadWindow,
    readTextFile,
    showUploadFilesDialog,
    showUploadDirsDialog,
    getPendingUploads,
    setToUploadFiles,
    showUploadZipDialog,
    getElectronFilesFromGoogleZip,
    setToUploadCollection,
    getEncryptionKey,
    setEncryptionKey,
    openDiskCache,
    deleteDiskCache,
    getDirFiles,
    getWatchMappings,
    addWatchMapping,
    removeWatchMapping,
    registerWatcherFunctions,
    isFolder,
    updateWatchMappingSyncedFiles,
    updateWatchMappingIgnoredFiles,
    logToDisk,
    convertToJPEG,
    openLogDirectory,
    registerUpdateEventListener,
    updateAndRestart,
    skipAppUpdate,
    getSentryUserID,
    getAppVersion,
    runFFmpegCmd,
    muteUpdateNotification,
    generateImageThumbnail,
    logRendererProcessMemoryUsage,
    registerForegroundEventListener,
    openDirectory,
    moveFile,
    deleteFolder,
    rename,
    deleteFile,
    updateOptOutOfCrashReports,
    computeImageEmbedding,
    computeTextEmbedding,
    getPlatform,
    getCacheDirectory,
    setCustomCacheDirectory,
});
