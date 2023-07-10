// preload.js

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
const { error } = require('console')
const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getImages: (fold) => {
    let images = fs.readdirSync(fold)
    return images
  },
  move: (source, target) => {
    console.log(`${source}=>${target}`);
    fs.rename(source, target, error => {
    })
  }
})