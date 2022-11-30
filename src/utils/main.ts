import { PROD_HOST_URL, RENDERER_OUTPUT_DIR } from '../config';
import { nativeImage, Tray, app, BrowserWindow, Menu } from 'electron';
import electronReload from 'electron-reload';
import serveNextAt from 'next-electron-server';
import path from 'path';
import { existsSync } from 'promise-fs';
import { isDev } from './common';
import { buildContextMenu, buildMenuBar } from './menu';
import autoLauncher from '../services/autoLauncher';
import { getHideDockIconPreference } from '../services/userPreference';
import {
    checkForUpdateAndNotify,
    setupAutoUpdater,
} from '../services/appUpdater';
import ElectronLog from 'electron-log';
import os from 'os';

export function handleUpdates(mainWindow: BrowserWindow) {
    if (!isDev) {
        setupAutoUpdater();
        checkForUpdateAndNotify(mainWindow);
    }
}
export function setupTrayItem(mainWindow: BrowserWindow) {
    const trayImgPath = isDev
        ? 'build/taskbar-icon.png'
        : path.join(process.resourcesPath, 'taskbar-icon.png');
    const trayIcon = nativeImage.createFromPath(trayImgPath);
    const tray = new Tray(trayIcon);
    tray.setToolTip('ente');
    tray.setContextMenu(buildContextMenu(mainWindow));
    return tray;
}

export function handleDownloads(mainWindow: BrowserWindow) {
    mainWindow.webContents.session.on('will-download', (_, item) => {
        item.setSavePath(
            getUniqueSavePath(item.getFilename(), app.getPath('downloads'))
        );
    });
}

export function getUniqueSavePath(filename: string, directory: string): string {
    let uniqueFileSavePath = path.join(directory, filename);
    const { name: filenameWithoutExtension, ext: extension } =
        path.parse(filename);
    let n = 0;
    while (existsSync(uniqueFileSavePath)) {
        n++;
        // filter need to remove undefined extension from the array
        // else [`${fileName}`, undefined].join(".") will lead to `${fileName}.` as joined string
        const fileNameWithNumberedSuffix = [
            `${filenameWithoutExtension}(${n})`,
            extension,
        ]
            .filter((x) => x) // filters out undefined/null values
            .join('.');
        uniqueFileSavePath = path.join(directory, fileNameWithNumberedSuffix);
    }
    return uniqueFileSavePath;
}

export function setupMacWindowOnDockIconClick() {
    app.on('activate', function () {
        const windows = BrowserWindow.getAllWindows();
        // we allow only one window
        windows[0].show();
    });
}

export async function setupMainMenu() {
    Menu.setApplicationMenu(await buildMenuBar());
}

export function setupMainHotReload() {
    if (isDev) {
        electronReload(__dirname, {});
    }
}

export function setupNextElectronServe() {
    serveNextAt(PROD_HOST_URL, {
        outputDir: RENDERER_OUTPUT_DIR,
    });
}

export function isPlatformMac() {
    return process.platform === 'darwin';
}

export function isPlatformWindows() {
    return process.platform === 'win32';
}

export async function handleDockIconHideOnAutoLaunch() {
    const shouldHideDockIcon = getHideDockIconPreference();
    const wasAutoLaunched = await autoLauncher.wasAutoLaunched();

    if (isPlatformMac() && shouldHideDockIcon && wasAutoLaunched) {
        app.dock.hide();
    }
}

export function enableSharedArrayBufferSupport() {
    app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');
}

export function logSystemInfo() {
    const systemVersion = process.getSystemVersion();
    const osName = process.platform;
    const osRelease = os.release();
    ElectronLog.info({ osName, osRelease, systemVersion });
}
