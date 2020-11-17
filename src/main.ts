import { app, BrowserWindow } from "electron"

function createWindow() {
    //Create browser window
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true
        }     
    })

    mainWindow.loadFile('dist/index.html')
}

app.whenReady().then(createWindow)