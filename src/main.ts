import { app, BrowserWindow } from "electron"

function createWindow() {
    //Create browser window
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow)