const sourceButton = document.getElementById('source-button')
var targetImage = document.getElementById('target-image')

sourceButton.addEventListener('click', async () => {
  const sourcePath = await window.electronAPI.openFile()
  if (sourcePath) {
    document.getElementById('source-path').innerHTML = sourcePath
    let images = window.electronAPI.getImages(sourcePath)
    targetImage.setAttribute('src', `${sourcePath}/${images[0]}`)
    window.sourcePath = sourcePath
    window.imgs = images
  }
})

const targetButton = document.getElementById('target-button')
targetButton.addEventListener('click', async () => {
  const targetPath = await window.electronAPI.openFile()
  if (targetPath) {
    window.targetPath = targetPath
    document.getElementById('target-path').innerText = targetPath
    let folds = window.electronAPI.getImages(targetPath)
    const classify = document.getElementById('classify')
    let buttons = ''
    for (let fold of folds) {
      buttons += `<input type="button" class="success" value=${fold} onclick="move(value)">`
    }
    buttons += `<input type="button" class="warning" value='删除' onclick="move()">`
    classify.innerHTML = buttons
  }
})

function move(target = 'bin') {
  const sourceFile = `${window.sourcePath}/${window.imgs[0]}`
  let targetFold = ''
  if (target === 'bin') {
    targetFold = `D:/albums/bin/${window.imgs[0]}`
  } else {
    targetFold = `${window.targetPath}/${target}/${window.imgs[0]}`
  }
  window.electronAPI.move(sourceFile, targetFold)
  window.imgs.shift()
  targetImage.setAttribute('src', `${sourcePath}/${window.imgs[0]}`)
}