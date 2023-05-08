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
import { openDiskCache, deleteDiskCache } from './api/cache';
import {
    checkExistsAndCreateDir,
    checkExistsAndRename,
    saveStreamToDisk,
    saveFileToDisk,
    getExportRecord,
    setExportRecord,
    exists,
} from './api/export';
import {
    selectRootDirectory,
    logToDisk,
    openLogDirectory,
    getSentryUserID,
    getAppVersion,
    openDirectory,
} from './api/common';
import { fixHotReloadNext12 } from './utils/preload';
import { isFolder, getDirFiles } from './api/fs';
import {
    convertHEIC,
    generateImageThumbnail,
    extractImageDimensions,
} from './api/imageProcessor';
import { setupLogging } from './utils/logging';
import {
    setupRendererProcessStatsLogger,
    logRendererProcessMemoryUsage,
} from './utils/processStats';
import { runFFmpegCmd } from './api/ffmpeg';

fixHotReloadNext12();
setupLogging();
setupRendererProcessStatsLogger();

const windowObject: any = window;

windowObject['ElectronAPIs'] = {
    exists,
    checkExistsAndCreateDir,
    checkExistsAndRename,
    saveStreamToDisk,
    saveFileToDisk,
    selectRootDirectory,
    clearElectronStore,
    sendNotification,
    reloadWindow,
    getExportRecord,
    setExportRecord,
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
    convertHEIC,
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
    extractImageDimensions,
};
