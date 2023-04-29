/*获取画布的信息 */
const canvas = document.getElementById('#count')
var c = canvas.getContext('2d')
/**
 *
 * 坦克的速度 moveSpeed
 * 坦克子弹的速度  fireSpeed
 * 坦克子弹的类型  fireType
 * 坦克子弹的大小倍数 fireMultiple
 * 坦克子弹的反弹次数 fireReboundTimes
 * 坦克子弹打出方向  fireDirection
 * 坦克的图片 tankImages
 */

//所有的坦克
function Tank(moveSpeed, fireSpeed, fireType, fireMultiple, fireReboundTimes, fireDirection, tankImages) {
  this.moveSpeed = moveSpeed
  this.fireSpeed = fireSpeed
  this.fireType = fireType
  this.fireMultiple = fireMultiple
  this.fireReboundTimes = fireReboundTimes
  this.fireDirection = fireDirection
  this.tankImages = tankImages
}
function MyTank(moveSpeed, fireSpeed, fireType, fireMultiple, fireReboundTimes, fireDirection, tankImages) {
  Tank.call(this, moveSpeed, fireSpeed, fireType, fireMultiple, fireReboundTimes, fireDirection, tankImages)
  this.move = function () {}
}
// 图片导入函数
/*
 *  参数
 * src 图片路径
 * x,y 图片起始点坐标
 * w,h 图片的场合宽
 */
function Picture(src, x, y, w, h) {
  let img = new Image()
  img.src = src
  img.onload = function () {
    c.drawImage(this, x, y, w, h)
  }
}

function addImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject()
    }
    img.src = src
    if (img.complete) {
      resolve(img)
    }
  })
}

//获取开始按钮
const start = document.querySelector('#start')

start.addEventListener('click', function () {
  console.log('gogo')
  c.clearRect(0, 0, 600, 600)
  // var img = new Image()
  // img.src = '../坦克大战/images/开始.jpg'
  // img.onload = function () {
  //   c.drawImage(img, 0, 0, 600, 600)
  // }

  this.addImage('../坦克大战/images/开始.jpg').then((img) => {
    const firstPic = Picture('../坦克大战/images/开始.jpg', 0, 0, 600, 600)
    // 在这之后才能继续绘制其他图片
    this.addImage('../坦克大战/images/qidong.png').then((img) => {
       const seletGameModelPic = Picture('../坦克大战/images/qidong.png', 250, 460, 50, 50)
    })
  }
  
 
})
